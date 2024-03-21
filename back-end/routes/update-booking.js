exports.updateBooking = async (req, res, supabase) => {
    const {appointment_number, health_card, appointment_date, appointment_time} = req.body;
    try {
        const {data, error} = await supabase
            .from('Bookings')
            .update({
                health_card: health_card
                ,appointment_number: appointment_number
                , appointment_date: appointment_date
                , appointment_time: appointment_time
            })
            .eq('appointment_number', appointment_number);
        if (error) {
            console.error(error);
            console.log("There was an error updating appointment details");
        }
        res.json(data[0]);
    } catch (error) {
        console.error(error);
        console.log("There was an error updating appointment details");
    }
};