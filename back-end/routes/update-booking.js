exports.updateBooking = async (req, res, supabase) => {
  
    const { appointment_number } = req.params;
    const { data, error } = await supabase
      .from('Bookings')
      .update(req.body)
      .eq('appointment_number', appointment_number)
      .single();
  
    if (error) {
      console.error('There was an error updating appointment details', error);
      return res.status(500).json({ error: 'There was an error updating appointment details' });
    }
  
    return res.json({ message: 'Booking updated successfully' });
  }; //this actually works now please don't touch it