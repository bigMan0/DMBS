exports.getBookingbyId = async (req, res, supabase) => {
    const { health_card } = req.params;
    try{
        const{data,error} = await supabase.from('Bookings').select('*').eq('health_card',health_card);
        if (error){
            console.error(error);
            return res.status(500).json({message: 'Error fetching Bookings'})
        }
        if (data.length === 0){
            return res.status(404).json({message: 'Bookings not found'});
        }
        res.json(data);
    } catch(error){
        console.error(err);
        res.status(500).json({message: 'Error fetching Bookings'})
    }

};