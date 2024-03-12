module.exports = function(supabase) {
    return async (req, res) => {
      try {
        const { data, error } = await supabase.from('Patients').select('*'); 
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error fetching patients' });
        }
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching patients' });
      }
    };
  };
  