import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';

const CreateForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit({ title, author, content })}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const BlogList = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPress(item)}>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemAuthor}>{item.author}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const BlogDetail = ({ data }) => {
  return (
    <ScrollView>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{data.title}</Text>
        <Text style={styles.detailAuthor}>{data.author}</Text>
        <Text style={styles.detailContent}>{data.content}</Text>
      </View>
    </ScrollView>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleSubmit = blog => {
    setBlogs([...blogs, { ...blog, id: blogs.length + 1 }]);
  };

  return (
    <View style={styles.container}>
      {selectedBlog ? (
        <BlogDetail data={selectedBlog} />
      ) : (
        <>
          <CreateForm onSubmit={handleSubmit} />
          <BlogList data={blogs} onPress={setSelectedBlog} />
