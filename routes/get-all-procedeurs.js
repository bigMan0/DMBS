exports.getAllProcedeurs = async (req, res) => {
    try {
      const { data, error } = await supabase.from('Procedeurs').select('*'); 
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching procedeurs' });
      }
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching procedeurs' });
    }
  };