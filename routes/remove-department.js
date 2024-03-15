exports.removeDepartment = async (req, res, supabase) => {
    const { staff_number } = req.params;
    try {
        // Delete the patient's records
        const { error } = await supabase
            .from('Department')
            .delete()
            .eq('staff_number', staff_number);
            
        if (error) {
            console.error(error);
            console.log("There was an error removing the Department");
            return res.status(500).json({ message: "There was an error removing the Department" });
        }

        res.json({ message: 'Department removed successfully' });

    } catch (error) {
        console.error(error);
        console.log("There was an error removing the Department");
        res.status(500).json({ message: "here was an error removing the Department" });
    }
};