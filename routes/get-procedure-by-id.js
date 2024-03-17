exports.getProcedureById = async (req, res, supabase) => {
    const { health_card } = req.params; // assuming the id is passed as a URL parameter

    try {
        const { data, error } = await supabase
            .from('Procedures') // change 'Bookings' to 'Procedures'
            .select('*')
            .eq('health_card', health_card); // filter by procedure_id instead of health_card

        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching procedure' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Procedure not found' });
        }

        res.json(data[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching procedure' });
    }
};