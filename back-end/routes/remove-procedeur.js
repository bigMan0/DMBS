exports.removeProcedeur = async (req, res, supabase) => {
    const { health_card } = req.params;
    try {
        // Delete the patient's records
        const { error } = await supabase
            .from('Procedeur')
            .delete()
            .eq('health_card', health_card);
        if (error) {
            console.error(error);
            console.log("There was an error removing the Procedeur");
            return res.status(500).json({ message: "There was an error removing the Procedeur" });
        }

        res.json({ message: 'Procedeur  removed successfully' });
    } catch (error) {
        console.error(error);
        console.log("There was an error removing the Procedeur");
        res.status(500).json({ message: "There was an error removing the Procedeur" });
    }
};