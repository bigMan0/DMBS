exports.addpatients = async (req, res, supabase) => {
    const {health_card, first_name, last_name, address, phone, dob, gender} = req.body;
    try{
        const {data, error} = await supabase.from('Patients').insert(
            [{health_card: health_card
            ,first_name: first_name
            , last_name: last_name
            , address: address
            , phone: phone
            , dob: dob
            , gender: gender}]);
        if (error){
            console.error(error);
            console.log("There was an error adding patient details");
        }
        res.json(data[0]);
    } catch(error){

        console.error(error);
        console.log("There was an error adding patient details");
    }
};