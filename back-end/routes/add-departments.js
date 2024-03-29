exports.adddepartment = async (req, res, supabase) => {
    const {staff_number, staff_fname, department, staff_lname} = req.body;
    try{
        const {data, error} = await supabase.from('Department').insert(
            [{staff_number: staff_number
            ,staff_fname: staff_fname
            , department: department
            , staff_lname: staff_lname
        }]);
        if (error){
            console.error(error);
            console.log("There was an error adding department details");
        }
        if (data !== null && data[0]) {
            return res.json(data[0]);
        } else {
            console.log("Department added successfully, but no data returned from the database.");
            return res.status(200).json({ message: 'Department added successfully, but no data returned from the database.' });
        }
    } catch(error){

        console.error(error);
        console.log("There was an error adding department details");
    }
};