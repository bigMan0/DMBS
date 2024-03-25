exports.addbooking = async (req, res, supabase) => {
    const {health_card, appointment_number, appointment_date, appointment_time, staff_number} = req.body;
    
    const appointDate = new Date(appointment_date);
    if (isNaN(appointDate.getTime())) {
        console.error('Invalid date');
        return res.status(400).json({ error: 'Invalid date' });
    }
    
    let timeParts = appointment_time.split(":");
    if (timeParts.length !== 3) {
        console.error('Invalid time:', appointment_time);
        return res.status(400).json({ error: 'Invalid time' });
    }
    let appointmentTimeDate = new Date(Date.UTC(1970, 0, 1, timeParts[0], timeParts[1], timeParts[2]));

    let formattedTime; // Declare formattedTime here
    if (appointmentTimeDate instanceof Date && !isNaN(appointmentTimeDate)) {
        formattedTime = appointmentTimeDate.toISOString().substr(11, 8); // Assign a value to it here
    } else {
        console.error('Invalid date:', appointmentTimeDate);
        return res.status(400).json({ error: 'Invalid date' });
    }
    try{
        const {data, error} = await supabase.from('Bookings').insert(
            [{health_card: health_card
            ,appointment_number: appointment_number
            , appointment_date: appointDate
            , appointment_time: formattedTime
            , staff_number: staff_number
        }]);
        if (error){
            console.error(error);
            console.log("There was an error adding booking details");
        }
        if (data !== null && data[0]) {
            return res.json(data[0]);
        } else {
            console.log("Booking added successfully, but no data returned from the database.");
            return res.status(200).json({ message: 'Booking added successfully, but no data returned from the database.' });
        }
    } catch(error){
        console.error(error);
        console.log("There was an error adding booking details");
    }
};