exports.getDepartmentbyid = async (req, res, supabase) => {
    const { staff_number } = req.params;
    try{
        const{data,error} = await supabase.from('Department').select('*').eq('staff_number',staff_number);
        if (error){
            console.error(error);
            return res.status(500).json({message: 'Error fetching department by id'})
        }
        if (data.length === 0){
            return res.status(404).json({message: 'Patient not department'});
        }
        res.json(data[0]);
    } catch(error){
        console.error(err);
        res.status(500).json({message: 'Error fetching department'})
    }

};