exports.addprocedeur = async (req, res, supabase) => {
    const {health_card, procedure_number, procedure_date, procedure_info, staff_number} = req.body;
    try{
        const {data, error} = await supabase.from('Patients').insert(
            [{health_card: health_card
            ,procedure_number: procedure_number
            , procedure_date: procedure_date
            , procedure_info: procedure_info
            , staff_number: staff_number
        }]);
        if (error){
            console.error(error);
            console.log("There was an error adding proceduer details");
        }
        res.json(data[0]);
    } catch(error){

        console.error(error);
        console.log("There was an error updating proceduer details");
    }
};