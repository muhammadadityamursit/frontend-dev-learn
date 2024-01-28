// Soal 1
let namaLengkap = "Muhammad Aditya Mursit";
console.log(namaLengkap);

// Soal 2
let word = "JavaScript";
let second = " is";
let third = " awesome";

let outputGabunganVariable = word + second + third;
console.log(outputGabunganVariable);

//Soal 3
let hello = "Hello ";
let world = "World!!";

let output = `${hello} ${world}`;
console.log(output);

// Soal 4
let panjangPersegiPanjang = "8";
let lebarPersegiPanjang = "5";
let kelilingPersegiPanjang =
  2 * (parseInt(panjangPersegiPanjang) + parseInt(lebarPersegiPanjang));

console.log(kelilingPersegiPanjang);

// Soal 5
let sentences = "wah javascript itu keren sekali";

let firstWords = sentences.substring(0, 3);
let secondWords = "javascript"; // do your own!
let thirdWords = "itu"; // do your own!
let fourthWords = "keren"; // do your own!
let fifthWords = "sekali"; // do your own!

console.log("Kata Pertama: " + firstWords);
console.log("Kata Kedua: " + secondWords);
console.log("Kata Ketiga: " + thirdWords);
console.log("Kata Keempat: " + fourthWords);
console.log("Kata Kelima: " + fifthWords);

// Soal 6
var sentence = "I am going to be React JS Developer";

var exampleFirstWord = sentence[0];
var exampleSecondWord = sentence[2] + sentence[3];
var thirdWord = "going"; // lakukan sendiri, wajib mengikuti seperti contoh diatas
var fourthWord = "to"; // lakukan sendiri , wajib mengikuti seperti contoh diatas
var fifthWord = "be"; // lakukan sendiri , wajib mengikuti seperti contoh diatas
var sixthWord = "React"; // lakukan sendiri , wajib mengikuti seperti contoh diatas
var seventhWord = "JS"; // lakukan sendiri , wajib mengikuti seperti contoh diatas
var eighthWord = "Developer"; // lakukan sendiri , wajib mengikuti seperti contoh diatas

console.log("First Word: " + exampleFirstWord);
console.log("Second Word: " + exampleSecondWord);
console.log("Third Word: " + thirdWord);
console.log("Fourth Word: " + fourthWord);
console.log("Fifth Word: " + fifthWord);
console.log("Sixth Word: " + sixthWord);
console.log("Seventh Word: " + seventhWord);
console.log("Eighth Word: " + eighthWord);

// Soal 7
let txt = "I can eat bananas all day";
let hasil = txt.slice(10, 18); //lakukan pengambilan kalimat di variable ini

console.log(hasil);

// soal 8
var nilaiDoe = 50;

if (nilaiDoe >= 80) {
  console.log("A");
} else if (nilaiDoe >= 70 && nilaiDoe < 80) {
  console.log("B");
} else if (nilaiDoe >= 60 && nilaiDoe < 70) {
  console.log("C");
} else if (nilaiDoe >= 50 && nilaiDoe < 60) {
  console.log("D");
} else {
  console.log("E");
}

// Soal 9
let angka = 2;
let angkaDua = angka ? "angka nya 2" : "bukan angka 2";
console.log(angkaDua);

// Soal 10
var traffic_lights = "red";
switch (traffic_lights) {
  case "red": {
    console.log("berhenti");
    break;
  }
  case "yellow": {
    console.log("hati");
    break;
  }
  case "hijau": {
    console.log("berjalan");
    break;
  }
  default: {
    console.log("-");
  }
}

// Soal 11
for (var nomor = 1; nomor < 10; nomor++) {
  console.log("" + nomor);
}

// Soal 12
for (let i = 0; i < 10; i = i + 1) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

//Soal 13
for (let i = 0; i < 10; i = i + 1) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Soal 14
var array = [1, 2, 3, 4, 5, 6];

console.log(array[5]);

// Soal 15
let array2 = [5, 2, 4, 1, 3, 5];
array2.sort();
console.log(array2);

// Soal 16
let array3 = [
  "selamat",
  "anda",
  "melakukan",
  "perulangan",
  "array",
  "dengan",
  "for",
];

for (let i = 0; i < array3.length; i = i + 1) {
  console.log(i);
  console.log(array3[i]);

  console.log("====");
  console.log();
}

// Soal 17
let array4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < array4.length; i = i + 1) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Soal 18
let kalimat = ["saya", "sangat", "senang", "belajar", "javascript"];
let gabung = kalimat.join(" ");
console.log(gabung);

// Soal 19
var sayuran = [];
sayuran.push(
  "Kangkung",
  "Bayam",
  "Buncis",
  "Kubis",
  "Timun",
  "Seledri",
  "Tauge"
);
console.log(sayuran);
