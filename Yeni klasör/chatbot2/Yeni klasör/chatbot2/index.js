var data = {
    chatinit: {
        title: ["Merhaba 👋🏿", "Ben SeyBot", "Merhaba, sohbete başlamadan önce <a href='https://aydinlatma.seyhan.bel.tr:444/ar/?aref=8F83630A-A983-4AE0-B375-B16DE7EE8373'>KVKK</a> aydınlatma metnini okuyup anladığınıza dair sizden onay almam gerekiyor. Onay veriyor musunuz?."],
        options: ["Kabul Ediyorum", "Kabul Etmiyorum"],
    },
    kabul: {
        title: ["Size nasıl yardımcı olabilirim?"],
        options: ["WiFi", "Eğitimler", "İletişim", "Staj", "Randevu Al", "Randevularımı Sorgula", "Randevu İptal"],
    },
    kabulEtmiyorum: {
        title: ["KVKK metnini kabul etmeden size yardımcı olamam."],
        options: ["Kabul Ediyorum", "Kabul Etmiyorum"],
    },
    wifi: {
        title: ["Wi-Fi'ye bağlanmak için: SEYHAN_BELEDİYESİ ağını seçin ve bağlanın. Açılan pencereden <a href='http://hs.seyhan.bel.tr/YeniKayit'>kayıt olun</a>. Giriş yaparak interneti kullanmaya başlayın. Sorun yaşarsanız teknik destek ekibimizle iletişime geçin.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    eğitimler: {
        title: ["<a href='https://seytim.org/egitimler.php'>Eğitimler</a> hakkında bilgi almak için tıklayın.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    iletişim: {
        title: ["<a href='https://seytim.org/iletisim.php'>İletişim</a> bilgilerine ulaşmak için tıklayın.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    staj: {
        title: ["SEYTİM'de staj yapmak isteyen adaylar, Seyhan Belediyesi İnsan Kaynakları ve Eğitim Müdürlüğü ile iletişime geçmelidir. Detaylı bilgi ve başvuru süreçleri için lütfen İnsan Kaynakları ve Eğitim Müdürlüğü ile irtibata geçin.", "Başka bir isteğiniz var mı?"],
        options: ["Evet", "Hayır"]
    },
    tekrar: {
        title: ["Size başka nasıl yardımcı olabilirim?"],
        options: ["WiFi", "Eğitimler", "İletişim", "Randevu Al", "Randevularımı Sorgula", "Randevu İptal"],
    },
    randevu: {
        title: ["Hangi atölye veya cihazı kullanmak istiyorsunuz?"],
        options: ["İmalat Atölyesi", "Elektrik Elektronik Atölyesi", "3D Yazıcı"],
    },
    tarih: {
        title: ["Hangi tarihte randevu almak istersiniz?"],
        options: [], // Tarih seçenekleri dinamik olarak eklenecek
    },
    saat: {
        title: ["Hangi saatte randevu almak istersiniz?"],
        options: ["10:00", "14:00", "16:00"],
    },
    randevularimiSorgula: {
        title: ["Randevularınızı sorguluyorum..."],
        options: [],
    },
    randevuIptal: {
        title: ["İptal etmek istediğiniz randevunun ID'sini girin."],
        options: [],
    }
};

document.getElementById("chat-bubble").addEventListener("click", toggleChatBot);
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

var cbot = document.getElementById("chat-box");

var len1 = data.chatinit.title.length;

function toggleChatBot() {
    var chatWindow = document.getElementById('test');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'block';
        initChat();
    } else {
        chatWindow.style.display = 'none';
    }
}

function initChat() {
    j = 0;
    cbot.innerHTML = '';
    for (var i = 0; i < len1; i++) {
        setTimeout(handleChat, (i * 1));
    }
    setTimeout(function() {
        showOptions(data.chatinit.options);
    }, ((len1 + 1) * 1));
}

function refreshChat() {
    initChat();
}

var j = 0;
function handleChat() {
    var elm = document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<div>' + options[i] + '</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt() {
    var str = this.innerText;
    var tempObj;

    switch (str) {
        case "Kabul Ediyorum":
            tempObj = data.kabul;
            break;
        case "Kabul Etmiyorum":
            tempObj = data.kabulEtmiyorum;
            break;
        case "WiFi":
            tempObj = data.wifi;
            break;
        case "Eğitimler":
            tempObj = data.eğitimler;
            break;
        case "İletişim":
            tempObj = data.iletişim;
            break;
        case "Staj":
            tempObj = data.staj;
            break;
        case "Evet":
            tempObj = data.tekrar;
            break;
        case "Hayır":
            tempObj = { title: ["Teşekkürler! Size yardımcı olabileceğim başka bir şey yoksa hoşçakalın!"], options: [] };
            break;
        case "Randevu Al":
            tempObj = data.randevu;
            currentStep = 'selectWorkshop';
            break;
        case "Randevularımı Sorgula":
            tempObj = data.randevularimiSorgula;
            queryAppointments();
            return;
        case "Randevu İptal":
            tempObj = data.randevuIptal;
            break;
        default:
            if (currentStep === 'selectWorkshop') {
                appointmentData.workshopOrEquipment = str;
                generateDateOptions(); // Tarih seçeneklerini dinamik olarak oluştur
                tempObj = data.tarih;
                currentStep = 'selectDate';
            } else if (currentStep === 'selectDate') {
                appointmentData.date = str;
                tempObj = data.saat;
                currentStep = 'selectTime';
            } else if (currentStep === 'selectTime') {
                appointmentData.time = str;
                appointmentData.id = generateRandomID(); // 8 haneli randevu ID'si oluştur
                checkAvailabilityAndBook(appointmentData);
                return;
            } else {
                return;
            }
    }

    document.querySelectorAll(".opt").forEach(el => {
        el.remove();
    });

    var elm = document.createElement("p");
    elm.setAttribute("class", "test");
    var sp = '<span class="rep">' + this.innerText + '</span>';
    elm.innerHTML = sp;
    cbot.appendChild(elm);

    handleResults(tempObj.title, tempObj.options);
}

function handleDelay(title) {
    var elm = document.createElement("p");
    elm.innerHTML = title;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
}

function handleResults(title, options) {
    for (let i = 0; i < title.length; i++) {
        setTimeout(function() {
            handleDelay(title[i]);
        }, i * 1);
    }
    setTimeout(function() {
        showOptions(options);
    }, title.length * 1);
}

function handleScroll() {
    var elem = document.getElementById('chat-box');
    elem.scrollTop = elem.scrollHeight;
}

function sendMessage() {
    var userInput = document.getElementById('userInput').value.trim();
    if (userInput !== "") {
        var elm = document.createElement("p");
        elm.setAttribute("class", "test");
        var sp = '<span class="rep">' + userInput + '</span>';
        elm.innerHTML = sp;
        cbot.appendChild(elm);
        document.getElementById('userInput').value = '';
        handleScroll();

        switch (currentStep) {
            case 'selectWorkshop':
                appointmentData.workshopOrEquipment = userInput;
                generateDateOptions(); // Tarih seçeneklerini dinamik olarak oluştur
                handleResults(data.tarih.title, data.tarih.options);
                currentStep = 'selectDate';
                break;
            case 'selectDate':
                appointmentData.date = userInput;
                handleResults(data.saat.title, data.saat.options);
                currentStep = 'selectTime';
                break;
            case 'selectTime':
                appointmentData.time = userInput;
                appointmentData.id = generateRandomID(); // 8 haneli randevu ID'si oluştur
                checkAvailabilityAndBook(appointmentData);
                break;
            case 'cancelAppointment':
                cancelAppointment(userInput);
                break;
            default:
                break;
        }
    }
}

var firebaseConfig = {
  apiKey: "AIzaSyCIq8nXYopgfw9Uw0_YyDtJv-vGKRPQgJY",
  authDomain: "chatbot-6e8c4.firebaseapp.com",
  projectId: "chatbot-6e8c4",
  storageBucket: "chatbot-6e8c4.appspot.com",
  messagingSenderId: "360790668064",
  appId: "1:360790668064:web:2b09eb1ab01a772a141d45",
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var currentStep = '';
var appointmentData = {};

// 8 haneli rastgele sayı oluşturma fonksiyonu
function generateRandomID() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Tarih seçeneklerini dinamik olarak oluşturma fonksiyonu
// Tarih seçeneklerini sadece hafta içi günleri olarak oluşturma fonksiyonu
function generateDateOptions() {
    var dates = [];
    var count = 0;
    var today = new Date();
    
    // Hafta içi gün sayısını hedefe ulaştırmak için döngü
    while (count < 5) {
        // Günün indeksini al
        var dayOfWeek = today.getDay();
        
        // Eğer gün hafta içi ise (Pazartesi-Cuma)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            // Tarihleri ekle
            dates.push(today.toISOString().split('T')[0]);
            count++;
        }
        
        // Bir gün ilerle
        today.setDate(today.getDate() + 1);
    }
    
    data.tarih.options = dates;
}
////////////////////
// Randevu uygunluğunu kontrol etme ve randevu kaydetme fonksiyonu
function checkAvailabilityAndBook(appointmentData) {
    var appointmentRef = db.collection('appointments');
    var query = appointmentRef
        .where('workshopOrEquipment', '==', appointmentData.workshopOrEquipment)
        .where('date', '==', appointmentData.date)
        .where('time', '==', appointmentData.time);

    query.get().then(function(querySnapshot) {
        if (querySnapshot.empty) {
            // Randevu müsait, randevuyu kaydet
            appointmentRef.add(appointmentData).then(function() {
                handleResults(["Randevunuz başarıyla kaydedildi. ID'niz: " + appointmentData.id], ["Evet", "Hayır"]);
            }).catch(function(error) {
                console.error("Error adding document: ", error);
            });
        } else {
            // Randevu dolu
            handleResults(["Seçtiğiniz tarih ve saatte randevu dolu. Lütfen başka bir zaman dilimi seçin."], data.saat.options);
        }
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
/////////////////
// Randevuları sorgulama fonksiyonu
function queryAppointmentsByID(appointmentID) {
    var appointmentRef = db.collection('appointments').where('id', '==', appointmentID);
    
    appointmentRef.get().then(function(querySnapshot) {
        if (querySnapshot.empty) {
            handleResults(["Belirttiğiniz ID ile eşleşen bir randevu bulunamadı."], ["Evet", "Hayır"]);
        } else {
            querySnapshot.forEach(function(doc) {
                var appointment = doc.data();
                var appointmentDetails = "ID: " + appointment.id + ", Atölye: " + appointment.workshopOrEquipment + ", Tarih: " + appointment.date + ", Saat: " + appointment.time;
                handleResults([appointmentDetails], ["Evet", "Hayır"]);
            });
        }
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
////////////
function cancelAppointment(appointmentID) {
    var appointmentRef = db.collection('appointments').where('id', '==', appointmentID);
    
    appointmentRef.get().then(function(querySnapshot) {
        if (querySnapshot.empty) {
            handleResults(["Belirttiğiniz ID ile eşleşen bir randevu bulunamadı."], ["Evet", "Hayır"]);
        } else {
            var deletePromises = [];
            querySnapshot.forEach(function(doc) {
                deletePromises.push(doc.ref.delete());
            });
            
            // Tüm silme işlemleri tamamlandıktan sonra geri bildirim
            Promise.all(deletePromises).then(function() {
                handleResults(["Randevunuz başarıyla iptal edildi."], ["Evet", "Hayır"]);
            }).catch(function(error) {
                console.error("Randevu iptali sırasında bir hata oluştu: ", error);
                handleResults(["Randevu iptali sırasında bir hata oluştu. Lütfen tekrar deneyin."], ["Evet", "Hayır"]);
            });
        }
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
        handleResults(["Randevu iptali sırasında bir hata oluştu. Lütfen tekrar deneyin."], ["Evet", "Hayır"]);
    });
}


