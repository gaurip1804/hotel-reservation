 const dataColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field:'email',
      headerName: 'Email',
      description: 'Email',
      sortable: false,
      width: 160,
    },
    {
      field:'phone',
      headerName: 'Phone',
      description: 'phone',
      sortable: false,
      width: 160,
    },
  
    
  ];

  export default dataColumns;