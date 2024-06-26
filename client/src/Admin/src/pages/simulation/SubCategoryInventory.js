import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  VStack,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  getAllSubCategories,
  getInventoryByProduct,
} from "../../../../api/api";
import InventoryChart from "../../components/chart/InventoryChart";

const SubCategoryInventory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [days, setDays] = useState(30);
  const [inventoryData, setInventoryData] = useState(null);
  const [stockoutData, setStockoutData] = useState(null);

  useEffect(() => {
    getAllSubCategories()
      .then((res) => {
        console.log(res);
        if (res.data) {
          setCategories(res.data.totalSubCategories);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const runSimulation = () => {
    if (!selectedCategory || !selectedSeason || !days) {
      alert(
        "Please select a sub category, season, and enter the number of days."
      );
      return;
    }

    getInventoryByProduct(
      "",
      "",
      "",
      "",
      selectedSeason,
      days,
      selectedCategory
    )
      .then((res) => {
        if (res.data) {
          const inventoryLevels = res.data.projected_inventory.map(
            (data) => data.inventory_level
          );
          const dates = res.data.projected_inventory.map((data) => data.date);

          const stockoutEvents = res.data.stockout_events.map(
            (event) => event.demand
          );
          const stockoutDates = res.data.stockout_events.map(
            (event) => event.date
          );

          setInventoryData({
            title: "Inventory Levels",
            data: inventoryLevels,
            categories: dates,
          });

          setStockoutData({
            title: "Stockout Events",
            data: stockoutEvents,
            categories: stockoutDates,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex width="100%">
      <Sidebar />
      <Box flex="6" p={16}>
        <Heading mb={4}>Simulation by Sub Category</Heading>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel>Season</FormLabel>
            <Select
              placeholder="Select season"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Sub Category</FormLabel>
            <Select
              placeholder="Select sub category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Simulation for how many days</FormLabel>
            <Input
              type="number"
              placeholder="Enter number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </FormControl>
          <Button
            bg="#8FDACB"
            _hover={{ bg: "#76C7B7" }}
            color="white"
            mt={4}
            onClick={runSimulation}
          >
            Run Simulation
          </Button>
        </VStack>
        {inventoryData && (
          <Box mt={8}>
            <InventoryChart
              title={inventoryData.title}
              data={inventoryData.data}
              categories={inventoryData.categories}
              chartType="line"
            />
          </Box>
        )}
        {stockoutData && (
          <Box mt={8}>
            <InventoryChart
              title={stockoutData.title}
              data={stockoutData.data}
              categories={stockoutData.categories}
              chartType="bar"
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default SubCategoryInventory;
