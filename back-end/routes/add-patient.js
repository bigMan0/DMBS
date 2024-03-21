exports.addpatient = async (req, res, supabase) => {
    const {health_card, first_name, last_name, address, phone, dob, gender} = req.body;
    const phoneFloat = parseFloat(phone.replace(/-/g, ''));

    // Convert dob to a Date object
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
        console.error('Invalid date');
        return res.status(400).json({ error: 'Invalid date' });
    }

    try{
        const {data, error} = await supabase.from('Patients').insert(
            [{health_card: health_card
            ,first_name: first_name
            , last_name: last_name
            , address: address
            , phone: phoneFloat
            , dob: dobDate // Use dobDate instead of dob
            , gender: gender}]);
        if (error){
            console.error(error);
            console.log("There was an error adding patient details");
            return res.status(500).json({ error: 'An error occurred while adding patient details' });
        }
        if (data !== null && data[0]) {
            return res.json(data[0]);
        } else {
            console.log("Patient added successfully, but no data returned from the database.");
            return res.status(200).json({ message: 'Patient added successfully, but no data returned from the database.' });
        }
    } catch(error){
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding patient details' });
    }
};