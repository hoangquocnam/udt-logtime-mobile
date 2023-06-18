import React from "react";
import { useStores } from "@/hooks/useStores";
import { Box, Text, VStack } from "native-base";

const ProjectListScreen = () => {
  const { authStore } = useStores();
  return (
    <VStack>
      <Text>Project List</Text>
    </VStack>
  );
};

export default ProjectListScreen;
