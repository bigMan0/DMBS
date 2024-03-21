exports.updateDepartment = async (req, res, supabase) => {
    const {staff_number, staff_fname, department, staff_lname} = req.body;
    try {
        const {data, error} = await supabase
            .from('Department')
            .update({
                staff_number: staff_number
                ,staff_fname: staff_fname
                , department: department
                , staff_lname: staff_lname
            })
            .eq('staff_number', staff_number);
        if (error) {
            console.error(error);
            console.log("There was an error updating department details");
        }
        res.json(data[0]);
    } catch (error) {
        console.error(error);
        console.log("There was an error updating department details");
    }
};