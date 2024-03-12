exports.getAllPatients = async (res) => {
    try {
      const { data, error } = await supabase.from('Records').select('*'); // Replace 'patients' with your table name
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