exports.removePatientRecords = async (req, res, supabase) => {
    const { health_card } = req.params;
    try {
        // Delete the patient's records
        const { error } = await supabase
            .from('Records')
            .delete()
            .eq('health_card', health_card);
            
        if (error) {
            console.error(error);
            console.log("There was an error removing the patient's records");
            return res.status(500).json({ message: "There was an error removing the patient's records" });
        }

        res.json({ message: 'Patient records removed successfully' });

    } catch (error) {
        console.error(error);
        console.log("There was an error removing the patient's records");
        res.status(500).json({ message: "There was an error removing the patient's records" });
    }
};