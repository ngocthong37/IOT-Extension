const tf = require('tensorflow.js');

function createCharacterVocabulary() {
    tf.loadLayersModel('models/group1-shard1of1.bin').then((model) => {
        console.log("Model loaded: ", model);
        // Thực hiện các thao tác khác với mô hình đã tải
      }).catch((error) => {
        console.error("Error loading model: ", error);
      });
    let characterVocabulary = {};
    let indexCounter = 1; // Start index from 1
  
    // Lowercase letters
    for (let char of 'abcdefghijklmnopqrstuvwxyz') {
      characterVocabulary[char] = indexCounter;
      indexCounter++;
    }
  
    // Uppercase letters
    for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      characterVocabulary[char] = indexCounter;
      indexCounter++;
    }
  
    // Digits
    for (let char of '0123456789') {
      characterVocabulary[char] = indexCounter;
      indexCounter++;
    }
  
    // Special characters
    const specialCharacters = ',;.!?:”’/\\|_@#$%^&*~`+-=<>()[]{}:';
    for (let char of specialCharacters) {
      characterVocabulary[char] = indexCounter;
      indexCounter++;
    }
  
    return characterVocabulary;
  }
  
  const characterVocabulary = createCharacterVocabulary();
  
  function charToIndex(character) {
    return characterVocabulary[character] || 95; // -1 for unknown characters
  }
  
  function sequenceToIndex(inputSequence, maxLength) {
    const indices = Array.from(inputSequence, charToIndex);
    // You may need to implement padding here based on your requirements
    // Example: pad the sequence with zeros up to maxLength
    const paddedIndices = padSequence(indices, maxLength);
    return paddedIndices;
  }
  
  // Implement your own padding function based on your needs
  function padSequence(sequence, maxLength) {
    if (sequence.length < maxLength) {
      const diff = maxLength - sequence.length;
      for (let i = 0; i < diff; i++) {
        sequence.push(0); // Padding with zeros
      }
    }
    return sequence;
  }

  const protocol = window.location.protocol;
  // Example usage:
  const inputSequence = "Hải";
  const maxSequenceLength = 10;
  const indexedSequence = sequenceToIndex(inputSequence, maxSequenceLength);
  console.log(indexedSequence);
  
  const inputUrl = protocol + "//" + window.location.hostname;
  // Đoạn mã Python:
// print(input_sequence)
// indices = sequence_to_index(input_sequence, 200).reshape((1, 200))

// Chuyển sang JavaScript:
console.log(inputUrl); // In ra input_sequence

const indices = sequenceToIndex(inputUrl, 200).slice(0, 200); // Lấy 200 phần tử đầu tiên
const reshapedIndices = [indices]; // Tạo mảng 2 chiều với 1 hàng và 200 cột





// Hiển thị cửa sổ thông báo với phần protocol và hostname của trang web

