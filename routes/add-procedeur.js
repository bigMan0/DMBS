exports.addprocedeur = async (req, res, supabase) => {
    const {health_card, procedure_number, procedure_date, procedure_info, staff_number} = req.body;
    const procDate = new Date(procedure_date);
    if (isNaN(procDate.getTime())) {
        console.error('Invalid date');
        return res.status(400).json({ error: 'Invalid date' });
    }

    try{
        const {data, error} = await supabase.from('Procedures').insert(
            [{health_card: health_card
            ,procedure_number: procedure_number
            , procedure_date: procDate
            , procedure_info: procedure_info
            , staff_number: staff_number
        }]);
        if (error){
            console.error(error);
            console.log("There was an error adding proceduer details");
            return res.status(500).json({ message: 'Error adding proceduer details' });
        }
        if (data !== null && data[0]) {
            return res.json(data[0]);
        } else {
            console.log("Proceduer added successfully, but no data returned from the database.");
            return res.status(200).json({ message: 'Proceduer added successfully, but no data returned from the database.' });
        }
    } catch(error){

        console.error(error);
        console.log("There was an error updating proceduer details");
    }
};