exports.addrecord = async (req, res, supabase) => {
    const {health_card, allergies, prescriptions} = req.body;
    try{
        const {data, error} = await supabase.from('Patients').insert(
            [{health_card: health_card
            ,allergies: allergies
            , prescriptions: prescriptions
        }]);
        if (error){
            console.error(error);
            console.log("There was an error adding redord details");
        }
        res.json(data[0]);
    } catch(error){

        console.error(error);
        console.log("There was an error adding record details");
    }
};