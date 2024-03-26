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
            res.status(500).json({ message: "There was an error updating patient details" });
        } else {
            console.log("Patient details updated successfully");
            res.json({ message: "Patient details updated successfully", data: data });
        }
    } catch (error) {
        console.error(error);
        console.log("There was an error updating patient details");
        res.status(500).json({ message: "There was an error updating patient details" });
    }
};