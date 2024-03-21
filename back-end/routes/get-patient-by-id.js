exports.getPatientById = async (req, res, supabase) => {
    const { health_card } = req.params;
    try{
        const{data,error} = await supabase.from('Patients').select('*').eq('health_card',health_card);
        if (error){
            console.error(error);
            return res.status(500).json({message: 'Error fetching patient'})
        }
        if (data.length === 0){
            return res.status(404).json({message: 'Patient not found'});
        }
        res.json(data[0]);
    } catch(error){
        console.error(err);
        res.status(500).json({message: 'Error fetching patient'})
    }

};



