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
  Feather,
  Entypo
  } from 'native-base';

  import { FontAwesome5, AntDesign  } from '@expo/vector-icons';
  import { useQuery, useMutation } from "react-query";

  import { API } from "../config/api.js";
  import { TabRouter } from '@react-navigation/native';

function Tes(){
  let api = API();
  
  let [list, setList] = useState(null);

  const { data: todoIsDone, refetch } = useQuery("todoIsDoneCache", async () => {
    const config = {
      method: "GET",      
    };
    const response = await api.get("/todo-isdone", config);
    setList(response.data)
  });  

  useEffect( async () => {    
    refetch()
  },[list]);

  return(
    <Box>
      {list?.length !== 0 ? (
        <Box>
          {list?.map((item, i) => (         
            <Text fontFamily="body" fontWeight='bold' fontSize={30} mt={10} mb={5}>
                Todo List ({i + 1})                        
            </Text>            
          )).slice(-1)}  
        </Box>
      ) : (                  
        <Text fontFamily="body" fontWeight='bold' fontSize={30} mt={10} mb={5}>
          Todo List (0)                        
        </Text>                  
      )}
    </Box>

  )
}

export default function Home({ navigation, route }) {
  let api = API();
  
  let [list, setList] = useState();
  let [box, setBox] = useState();      
  const [value, setValue] = useState();    

  const { data: todos, refetch } = useQuery("todosCache", async () => {
    const config = {
      method: "GET",      
    };
    const response = await api.get("/todos", config);
    setList(response.data)
  });           

  useEffect( () => {   
    refetch()
  },[list]); 

  const handleStatusChange = item => {
    let id = item.id
    let isDone = !item.isDone    

    setBox({
      id, 
      isDone 
    })   
  }; 

  useEffect( async () => {
    const body = JSON.stringify(box);       

    const config = {
      method: "PATCH", 
      headers: {
        "Content-type": "application/json",
      },       
      body: body,
  };
      
  await api.patch("/todo-isdone", config);
    refetch();
  },[box]);

  const handleChange = title => setValue({
    title: title,
  });

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const body = JSON.stringify(value);       

      // Configuration
      const config = {
        method: "POST", 
        headers: {
          "Content-type": "application/json",
        },       
        body: body,
      };
      
      // Insert product data
      await api.post("/todo", config);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });  

  const [valueDel, setValueDel] = useState();

  const handleDelete = item => {
    let id = item.id

    setValueDel({
      id, 
    })   
  }; 

  useEffect( async () => {
    const body = JSON.stringify(valueDel);       

    const config = {
      method: "DELETE", 
      headers: {
        "Content-type": "application/json",
      },       
      body: body,
    };
    
    await api.delete("/todo", config);
    refetch();
  },[valueDel]);          

  return (
    <Box bg="gray.300" flex={1} alignItems="center" >     
      <Tes/>           
      <VStack> 
        <FormControl>
          <HStack mb={5} justifyContent="space-between" maxW={80} >
            <Input 
              bg='coolGray.200'
              placeholder="Add Task"
              onChangeText={handleChange}
              w='80%' 
            />
            <Button w='20%' borderRadius="sm" bg='gray.50' fontWeight='bold' onPress={(e) => handleSubmit.mutate(e)}>
              Add
            </Button>
          </HStack>
        </FormControl>
        <VStack> 
          {list?.map((item, itemI) => 
            <Box maxW="80" rounded="lg" mb={5} overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{borderColor: "coolGray.600",backgroundColor: "gray.700"}} _web={{shadow: 2,borderWidth: 0}} _light={{backgroundColor: "gray.50"}}>          
              <Stack p="4" space={3}>                                   
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack>     
                    <Checkbox 
                      defaultIsChecked={item.isDone} 
                      onChange={() => handleStatusChange(item, itemI)}
                    />                                                              
                    <Text mx="2" strikeThrough={item.isDone} _light={{color: item.isDone ? "gray.400" : "coolGray.800"}} _dark={{color: item.isDone ? "gray.400" : "coolGray.50"}}>
                      {item.title}
                    </Text>                                        
                  </HStack>
                  <HStack>
                    <Pressable onPress={() => { navigation.navigate('edit', { 
                          id: item.id,
                          title: item.title, 
                        });
                      }} 
                      mr={2}
                    > 
                      <FontAwesome5 name="edit" size={24} color="black" />               
                    </Pressable>
                    <Pressable onPress={() => {handleDelete(item, itemI)}}> 
                      <AntDesign name="delete" size={24} color="black" /> 
                    </Pressable>
                  </HStack>
                </HStack>
              </Stack>                                    
            </Box> 
          )}              
        </VStack>                           
      </VStack>                                                                           
    </Box>
  );
}
