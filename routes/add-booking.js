exports.addbooking = async (req, res, supabase) => {
    const {health_card, appointment_number, appointment_date, appointment_time} = req.body;
    try{
        const {data, error} = await supabase.from('Bookings').insert(
            [{health_card: health_card
            ,appointment_number: appointment_number
            , appointment_date: appointment_date
            , appointment_time: appointment_time
        }]);
        if (error){
            console.error(error);
            console.log("There was an error adding booking details");
        }
        res.json(data[0]);
    } catch(error){

        console.error(error);
        console.log("There was an error adding booking details");
    }
};