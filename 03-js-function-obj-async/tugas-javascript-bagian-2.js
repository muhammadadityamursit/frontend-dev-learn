// Soal 1

function cetakFunction() {
  console.log("Hallo Nama Saya Muhammad Aditya Mursit");
}

console.log(cetakFunction());

// Soal 2
let angka1 = 20;
let angka2 = 7;
let output = myFunction(angka1, angka2);

function myFunction() {
  return angka1 + angka2;
}

console.log(output);

// Soal 3
const Hello = () => {
  return "Hello";
};

console.log(Hello());

// Soal 4
let arrayDaftarPeserta = ["John Doe", "laki-laki", "baca buku", 1992];
let objDaftarPeserta = {
  nama: arrayDaftarPeserta[0],
  "jenis kelamin": arrayDaftarPeserta[1],
  hobi: arrayDaftarPeserta[2],
  "tahun lahir": arrayDaftarPeserta[3],
};
console.log(objDaftarPeserta);

// Soal 5
let buah = [
  { nama: "Nanas", warna: "Kuning", adaBijinya: "False", harga: 9000 },
  { nama: "Jeruk", warna: "Orange", adaBijinya: "True", harga: 8000 },
  { nama: "Semangaka", warna: "Hijau&Merah", adaBijinya: "True", harga: 10000 },
  { nama: "Pisang", warna: "Kuning", adaBijinya: "False", harga: 5000 },
];

var arrayBuahFilter = buah.filter(function (item) {
  return item.adaBijinya != "True";
});

console.log(arrayBuahFilter);

// Soal 6
let phone = {
  name: "Galaxy Note 20",
  brand: "Samsung",
  year: 2020,
};

const { name, brand, year } = phone;
console.log(name, brand, year);

// Soal 7
let dataBukuTambahan = {
  penulis: "john doe",
  tahunTerbit: 2020,
};

let buku = {
  nama: "pemograman dasar",
  jumlahHalaman: 172,
};

let objOutput = { ...dataBukuTambahan, ...buku };
console.log(objOutput);

// Soal 8

let mobil = {
  merk: "bmw",

  color: "red",

  year: 2002,
};

const functionObject = (param) => {
  return param;
};

console.log(functionObject(mobil));
