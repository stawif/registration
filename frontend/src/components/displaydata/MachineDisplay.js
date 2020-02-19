import React, { useState, useEffect } from "react";
import { Table } from "react-fluid-table";

export default function MachineDisplay() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch("http://127.0.0.1:8000/list-of-machines/")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const columns = [
    {
      key: "owner",
      name: "owner Name",
      width: 100
    },
    {
      key: "name",
      name: "Machine Name",
      width: 100
    }
  ];
  return (
    <div>
      <Table data={data} columns={columns} tableHeight={400} />
    </div>
  );
}

