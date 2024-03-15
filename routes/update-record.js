exports.updateRecord = async (req, res, supabase) => {
    const {health_card, allergies, prescriptions} = req.body;
    try {
        const {data, error} = await supabase
            .from('Records')
            .update({
                health_card: health_card
                ,allergies: allergies
                ,prescriptions: prescriptions
            })
            .eq('health_card', health_card);
        if (error) {
            console.error(error);
            console.log("There was an error updating Record details");
        }
        res.json(data[0]);
    } catch (error) {
        console.error(error);
        console.log("There was an error updating Record details");
    }
};