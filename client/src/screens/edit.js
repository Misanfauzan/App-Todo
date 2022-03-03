import React, { useState, useEffect } from 'react';
import { Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  Pressable,
  Center, 
  Stack,
  Checkbox,
  FlatList,
  Avatar,
  Spacer
  } from 'native-base';

  import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
  import { useQuery, useMutation } from "react-query";

  import { API } from "../config/api.js";

export default function Edit({ navigation, route }) {
  let api = API();

  const { id, title } = route.params;

  const [valueEdit, setValue] = useState();

  const handleChange = title => setValue({
    title: title,
  });  

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      
      const body = JSON.stringify(valueEdit);

      // Configuration
      const config = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: body,
      };
      
      await api.patch("/todo/" + id, config);   
      navigation.navigate('home', {title: "tess"})
    } catch (error) {
      console.log(error);
    }
  });         

  

  return (
    <Box bg="gray.300" flex={1} alignItems="center">      
      <FormControl alignItems='center' mt={5}>
          <VStack mb={5} w="80">
            <Input 
              bg='coolGray.200' 
              placeholder="Add Task"    
              defaultValue={title}                        
              onChangeText={handleChange}
            />
            <Button onPress={(e) => handleSubmit.mutate(e)} mt={5} borderRadius="sm" bg='gray.50' fontWeight='bold' >
              Edit
            </Button>
          </VStack>
      </FormControl>                               
    </Box>
  );
}
