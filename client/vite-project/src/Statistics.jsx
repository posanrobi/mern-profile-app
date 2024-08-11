import { Container, Typography } from "@mui/material";
import { fetchUsers } from "./api";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";

const Statistics = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const users = await fetchUsers();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const numberByGender = users.reduce(
    (acc, user) => {
      if (user.gender === "male") {
        acc.male++;
      } else if (user.gender === "female") {
        acc.female++;
      } else {
        acc.other++;
      }
      return acc;
    },
    { male: 0, female: 0, other: 0 }
  );

  const pieChartData = Object.keys(numberByGender).map((gender) => ({
    label: gender,
    value: numberByGender[gender],
  }));

  return (
    <>
      <Container sx={{ display: "flex" }}>
        <Container
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Typography variant="h5" margin="2rem 0 0 0">
            Group users by age
          </Typography>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: users.map((user) => user.name),
                tickSize: 10,
              },
            ]}
            series={[{ data: users.map((user) => user.age), label: "Age" }]}
            width={500}
            height={400}
          />
        </Container>
        <Container
          sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <Typography variant="h5" margin="2rem 0 0 0">
            Group by gender
          </Typography>
          <PieChart
            series={[{ data: pieChartData }]}
            width={400}
            height={300}
          />
        </Container>
      </Container>
    </>
  );
};

export default Statistics;
