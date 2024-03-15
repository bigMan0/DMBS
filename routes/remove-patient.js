exports.removePatient = async (req, res, supabase) => {
    const { health_card } = req.params;
    try {
        // First, delete the patient's bookings
        const { error: errorBookings } = await supabase
            .from('Bookings')
            .delete()
            .eq('health_card', health_card);
        if (errorBookings) {
            console.error(errorBookings);
            console.log("There was an error removing the patient's bookings");
            return res.status(500).json({ message: "There was an error removing the patient's bookings" });
        }
        // then, delete the patient's Records
        const { error: errorRecords } = await supabase
            .from('Records')
            .delete()
            .eq('health_card', health_card);
        if (errorRecords) {
            console.error(errorRecords);
            console.log("There was an error removing the patient's Records");
            return res.status(500).json({ message: "There was an error removing the patient's Records" });
        }
        // then, delete the patient's Procedeures
        const { error: errorProcedeur } = await supabase
            .from('Procedures')
            .delete()
            .eq('health_card', health_card);
        if (errorProcedeur) {
            console.error(errorProcedeur);
            console.log("There was an error removing the patient's Records");
            return res.status(500).json({ message: "There was an error removing the patient's Records" });
        }

        // Then, delete the patient
        const { error: errorPatient } = await supabase
            .from('Patients')
            .delete()
            .eq('health_card', health_card);
        if (errorPatient) {
            console.error(errorPatient);
            console.log("There was an error removing the patient");
            return res.status(500).json({ message: "There was an error removing the patient" });
        }

        res.json({ message: 'Patient and their appointments removed successfully' });
    } catch (error) {
        console.error(error);
        console.log("There was an error removing the patient");
        res.status(500).json({ message: "There was an error removing the patient" });
    }
};