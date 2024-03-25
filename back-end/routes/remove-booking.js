exports.removeBooking = async (req, res, supabase) => {
    const { appointment_number } = req.params;
    try {

        const { error } = await supabase
            .from('Bookings')
            .delete()
            .eq('appointment_number', appointment_number);
        if (error) {
            console.error(error);
            console.log("There was an error removing booking");
            return res.status(500).json({ message: "There was an error removing the booking" });
        }

        res.json({ message: 'Booking removed successfully' });
    } catch (error) {
        console.error(error);
        console.log("There was an error removing the booking");
        res.status(500).json({ message: "There was an error removing the booking" });
    }
};