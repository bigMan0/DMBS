exports.getAllRecords = async (req, res, supabase) => {
    try {
      const { data, error } = await supabase.from('Records').select('*'); 
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching Records' });
      }
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Records' });
    }
  };