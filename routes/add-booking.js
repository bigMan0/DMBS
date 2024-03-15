exports.addbooking = async (req, res, supabase) => {
    const {health_card, appointment_number, appointment_date, appointment_time, staff_number} = req.body;
    
    const appointDate = new Date(appointment_date);
    if (isNaN(appointDate.getTime())) {
        console.error('Invalid date');
        return res.status(400).json({ error: 'Invalid date' });
    }

    let timeParts = appointment_time.split(":");
    let appointmentTimeDate = new Date();
    appointmentTimeDate.setHours(timeParts[0]);
    appointmentTimeDate.setMinutes(timeParts[1]);
    appointmentTimeDate.setSeconds(timeParts[2]);
    
    let formattedTime = appointmentTimeDate.toISOString().substr(11, 8);

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