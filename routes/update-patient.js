exports.updatePatient = async (req, res, supabase) => {
    const {health_card, first_name, last_name, address, phone, dob, gender} = req.body;
    try {
        const {data, error} = await supabase
            .from('Patients')
            .update({
                first_name: first_name,
                last_name: last_name,
                address: address,
                phone: phone,
                dob: dob,
                gender: gender
            })
            .eq('health_card', health_card);
        if (error) {
            console.error(error);
            console.log("There was an error updating patient details");
        }
        res.json(data[0]);
    } catch (error) {
        console.error(error);
        console.log("There was an error updating patient details");
    }
};