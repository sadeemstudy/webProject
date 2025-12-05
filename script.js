// نستنى لين الصفحة كلها تخلص تحميل
window.addEventListener("DOMContentLoaded", function () {

 
  const backToTopBtn = document.getElementById("backToTop");


  if (backToTopBtn) {
    
    window.addEventListener("scroll", function () {
      const scrollAmount = window.scrollY || document.documentElement.scrollTop;

      if (scrollAmount > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

  
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
 
  }//end function

  // ===== "Start Your Journey"  =====
  const startBtn = document.getElementById("start-btn");
  const servicesSection = document.getElementById("services-section");

 
  if (startBtn && servicesSection) {
    startBtn.addEventListener("click", function () {
      servicesSection.scrollIntoView({
        behavior: "smooth"
      });
    });
  }
});


// ====================== services-page ======================

document.addEventListener("DOMContentLoaded", function () {

  // نتأكد أننا في صفحة الخدمات فقط
  if (!document.body.classList.contains("services-page")) {
    return;
  }

  const container = document.querySelector(".services-container.c2");
  const cards = Array.from(container.querySelectorAll(".service-card.c1"));
  const sortSelect = document.getElementById("sortBy");

  // دالة ترجع الاسم من عنوان الكرت (h3)
  function getCardTitle(card) {
    const h3 = card.querySelector("h3");
    if (!h3) return "";
    // نحذف الإيموجي إن وجد ونخلي النص
    return h3.textContent.replace(/^[^\w]+/, "").toLowerCase().trim();
  }

  //  بعثرة الكروت عشوائياً عند تحميل الصفحة
  function shuffleCards() {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    shuffled.forEach(card => container.appendChild(card));
  }

  //  فرز الكروت حسب الاسم
  function sortCards(order) {
    const sorted = [...cards].sort((a, b) => {
      const nameA = getCardTitle(a);
      const nameB = getCardTitle(b);

      if (nameA < nameB) return order === "az" ? -1 : 1;
      if (nameA > nameB) return order === "az" ? 1 : -1;
      return 0;
    });

    sorted.forEach(card => container.appendChild(card));
  }

  // نبعثر أول مرة
  shuffleCards();

  
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      if (this.value === "name-az") {
        sortCards("az");
      } else if (this.value === "name-za") {
        sortCards("za");
      }
    });
  }
});















// JavaScript for About Us Page
function validateForm() {
  var name = document.getElementById("name").value;
  var dob = document.getElementById("dob").value;
  var email = document.getElementById("email").value;
  var expertise = document.getElementById("expertise-skills-education").value;
  var fileInput = document.getElementById("photo");
  var fileName = fileInput.value;

  // Check empty fields
  if (name === "" || dob === "" || email === "" || expertise === "" || fileName === "") {
    alert("All fields are required.");
    return false;
  }

  // Check name 
  var startsWithNumber = /^\d/;
  if (name.search(startsWithNumber) === 0) {
    alert("Name must not start with a number.");
    return false;
  }

  // Check email 
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Check age 
  var dobDate = new Date(dob);
  var cutoffDate = new Date('2008-01-01');
  if (dobDate > cutoffDate) {
    alert("Date of Birth should not be after 2008.");
    return false;
  }

  // Check file type
  if (fileName) {
    var fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    var allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    var isValidExtension = false;
    
    for (var i = 0; i < allowedExtensions.length; i++) {
        if (fileExtension === allowedExtensions[i]) {
            isValidExtension = true;
            break;
        }
    }
    
    if (!isValidExtension) {
        alert("Please upload a valid image file (JPEG, JPG, PNG, GIF)");
        return false;
    }
  }

  alert("Thank you! Your application has been submitted successfully. Name: " + name);
  return true;
}

// JavaScript for Add New Service Page
document.addEventListener('DOMContentLoaded', function() {
    var addServiceForm = document.getElementById('add-new-service-form');
    
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var serviceName = document.getElementById('service-name').value;
            var serviceDescription = document.getElementById('service-description').value;
            var servicePrice = document.getElementById('service-price').value;
            var fileInput = document.getElementById('service-image');
            var fileName = fileInput.value;
            
            // Form validation
            if (serviceName === "" || serviceDescription === "" || servicePrice === "" || fileName === "") {
                alert('All fields are required!');
                return;
            }
            
            var startsWithNumber = /^\d/;
            if (serviceName.search(startsWithNumber) === 0) {
                alert('Service name cannot start with a number!');
                return;
            }
            
            if (isNaN(servicePrice) || parseFloat(servicePrice) <= 0) {
                alert('Price must be a valid number greater than 0!');
                return;
            }
            
            if (fileName) {
                var fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                var allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
                var isValidExtension = false;
                
                for (var i = 0; i < allowedExtensions.length; i++) {
                    if (fileExtension === allowedExtensions[i]) {
                        isValidExtension = true;
                        break;
                    }
                }
                
                if (!isValidExtension) {
                    alert('Please upload a valid image file (JPEG, PNG, GIF)');
                    return;
                }
            }
            
            // Create service object
            var newService = {
                name: serviceName,
                description: serviceDescription,
                price: servicePrice + ' SAR',
                imageName: fileName.substring(fileName.lastIndexOf("/") + 1),
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            var services = JSON.parse(localStorage.getItem('providerServices')) || [];
            services.push(newService);
            localStorage.setItem('providerServices', JSON.stringify(services));
            
            // Show success message
            alert('Service "' + serviceName + '" has been added successfully!');
            
            // Clear form
            document.getElementById('service-name').value = '';
            document.getElementById('service-description').value = '';
            document.getElementById('service-price').value = '';
            fileInput.value = '';
        });
    }
});
// JavaScript for Manage Staff Members Page

// JavaScript for Manage Staff Members Page
window.onload = function() {
    initializeStaffManagement();
    loadStaffMembers();
};

function initializeStaffManagement() {
    var selectAllBtn = document.querySelector('.select-all-btn');
    var deleteBtn = document.querySelector('.delete-btn');
    var addStaffForm = document.querySelector('.add-new-staff form');
    
    if (selectAllBtn) {
        selectAllBtn.onclick = function() {
            var checkboxes = document.querySelectorAll('input[name="select-staff"]');
            var allChecked = true;
            
            for (var i = 0; i < checkboxes.length; i++) {
                if (!checkboxes[i].checked) {
                    allChecked = false;
                    break;
                }
            }
            
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = !allChecked;
            }
            
            this.textContent = allChecked ? 'Select All' : 'Deselect All';
        };
    }

    if (deleteBtn) {
        deleteBtn.onclick = function() {
            var checkboxes = document.querySelectorAll('input[name="select-staff"]:checked');
            
            if (checkboxes.length === 0) {
                alert("Please select at least one member");
                return;
            }
            
            if (confirm('Are you sure you want to delete ' + checkboxes.length + ' staff member(s)?')) {
                deleteSelectedStaff(checkboxes);
                alert('Staff members deleted successfully!');
            }
        };
    }

    if (addStaffForm) {
        addStaffForm.onsubmit = function(e) {
            e.preventDefault();
            addNewStaffMember();
            return false;
        };
    }
}

function loadStaffMembers() {
    var staffContainer = document.querySelector('.staff-container');
    if (!staffContainer) return;
    
    // تحميل الموظفين من localStorage أو استخدام القائمة الافتراضية
    var staffMembers = JSON.parse(localStorage.getItem('staffMembers'));
    
    if (!staffMembers) {
        // إذا لا يوجد بيانات محفوظة، إنشاء القائمة الافتراضية
        staffMembers = [
            {
                name: "Sara Ahmed",
                role: "Space Exploration Guide",
                photoUrl: "images/Sara Ahmed.jpg",
                link: "staff-page1.html"
            },
            {
                name: "Khalid Ali",
                role: "Virtual Reality Developer", 
                photoUrl: "images/Khalid Ali.jpg",
                link: "staff-page2.html"
            },
            {
                name: "Mona Saad",
                role: "Astronomical Research Specialist",
                photoUrl: "images/Mona Saad.jpg", 
                link: "staff-page3.html"
            },
            {
                name: "Omar N.",
                role: "Space Mission Coordinator",
                photoUrl: "images/Omar N..jpg",
                link: "staff-page4.html"
            },
            {
                name: "Lama F.",
                role: "Educational Content Developer",
                photoUrl: "images/Lama F..jpg",
                link: "staff-page5.html"
            },
            {
                name: "Yousef H.",
                role: "Science Educator",
                photoUrl: "images/Yousef H..jpg",
                link: "staff-page6.html"
            },
            {
                name: "Reem A.",
                role: "Operations Manager", 
                photoUrl: "images/Reem A..jpg",
                link: "staff-page7.html"
            },
            {
                name: "Faisal B.",
                role: "Customer Relations Manager",
                photoUrl: "images/Faisal B..jpg",
                link: "staff-page8.html"
            }
        ];
        localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
    }
    
    // عرض الموظفين
    staffContainer.innerHTML = '';
    
    staffMembers.forEach(function(staff, index) {
        var staffBox = document.createElement('div');
        staffBox.className = 'staff-box';
        staffBox.innerHTML = `
            <input type="checkbox" name="select-staff" value="${index}" />
            <img src="${staff.photoUrl}" alt="${staff.name}" />
            <p class="name">${staff.name}</p>
            <p class="role">${staff.role}</p>
            <a class="staff-link" href="${staff.link}">View Page</a>
        `;
        staffContainer.appendChild(staffBox);
    });
}

function addNewStaffMember() {
    var staffName = document.getElementById('staff-name').value;
    var staffDob = document.getElementById('staff-dob').value;
    var staffEmail = document.getElementById('staff-email').value;
    var staffExpertise = document.getElementById('staff-expertise').value;
    var fileInput = document.getElementById('staff-photo');
    var fileName = fileInput.value;
    
    // التحقق من الحقول الفارغة (لا تشمل الصورة)
    if (staffName === "" || staffDob === "" || staffEmail === "" || staffExpertise === "") {
        alert('All fields are required!');
        return false;
    }
    
    // التحقق من أن الاسم لا يبدأ برقم
    var startsWithNumber = /^\d/;
    if (staffName.search(startsWithNumber) === 0) {
        alert('Staff name cannot start with a number!');
        return false;
    }
    
    // التحقق من صحة البريد الإلكتروني
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!staffEmail.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // التحقق من العمر (أكبر من 18 سنة)
    var dobDate = new Date(staffDob);
    var cutoffDate = new Date('2008-01-01');
    if (dobDate > cutoffDate) {
        alert('Staff member must be over 18 years old.');
        return false;
    }
    
    // استخدام صورة افتراضية للموظفين الجدد
    var photoUrl = "images/default-avatar.jpg"; // الصورة الافتراضية
    
    // إنشاء كائن الموظف الجديد
    var newStaff = {
        name: staffName,
        role: staffExpertise,
        photoUrl: photoUrl, // استخدام الصورة الافتراضية
        link: "#",
        email: staffEmail,
        dob: staffDob,
        timestamp: new Date().toISOString()
    };
    
    // إضافة الموظف الجديد للقائمة
    var staffMembers = JSON.parse(localStorage.getItem('staffMembers')) || [];
    staffMembers.push(newStaff);
    localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
    
    // إعادة تحميل القائمة
    loadStaffMembers();
    
    // رسالة نجاح
    alert('Staff member "' + staffName + '" has been added successfully!');
    
    // تفريغ الفورم
    document.getElementById('staff-name').value = '';
    document.getElementById('staff-dob').value = '';
    document.getElementById('staff-email').value = '';
    document.getElementById('staff-expertise').value = '';
    fileInput.value = '';
    
    return true;
}

function deleteSelectedStaff(checkedBoxes) {
    var staffMembers = JSON.parse(localStorage.getItem('staffMembers')) || [];
    
    // إنشاء مصفوفة جديدة بدون العناصر المحددة للحذف
    var updatedStaff = staffMembers.filter(function(staff, index) {
        // التحقق إذا كان هذا الفهرس محدد للحذف
        var shouldDelete = Array.from(checkedBoxes).some(function(checkbox) {
            return parseInt(checkbox.value) === index;
        });
        
        // إرجاع true للحفاظ على العنصر إذا لم يكن محدد للحذف
        return !shouldDelete;
    });
    
    // حفظ المصفوفة المحدثة
    localStorage.setItem('staffMembers', JSON.stringify(updatedStaff));
    
    // إعادة تحميل القائمة
    loadStaffMembers();
}


///Provider Dashboard ////////////////

document.addEventListener('DOMContentLoaded', function() {
    loadProviderServices();
});

function loadProviderServices() {
    const serviceContainer = document.getElementById('service-container');
    const noServicesMsg = document.getElementById('no-services-msg');
    
    if (!serviceContainer) return;
    
    const savedServices = JSON.parse(localStorage.getItem('providerServices')) || [];
    
    if (savedServices.length > 0) {
        noServicesMsg.style.display = 'none';
        serviceContainer.innerHTML = '';
        
        savedServices.forEach((service, index) => {
            const serviceBox = document.createElement('div');
            serviceBox.className = 'service-box';
            serviceBox.innerHTML = `
                <img src="images/default-service.jpg" alt="${service.name}" />
                <p><strong>${service.name}</strong></p>
                <p>${service.description}</p>
                <p class="price">${service.price}</p>
                <small>Added: ${new Date(service.timestamp).toLocaleDateString()}</small>
            `;
            serviceContainer.appendChild(serviceBox);
        });
    } else {
        noServicesMsg.style.display = 'block';
        serviceContainer.innerHTML = '';
    }
}
////////////////


//// Add New Service Page - تأكد من حفظ الخدمات بشكل صحيح
document.addEventListener('DOMContentLoaded', function() {
    const addServiceForm = document.getElementById('add-new-service-form');
    
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceName = document.getElementById('service-name').value;
            const serviceDescription = document.getElementById('service-description').value;
            const servicePrice = document.getElementById('service-price').value;
            
            if (serviceName === "" || serviceDescription === "" || servicePrice === "") {
                alert('All fields are required!');
                return;
            }
            
            const startsWithNumber = /^\d/;
            if (serviceName.search(startsWithNumber) === 0) {
                alert('Service name cannot start with a number!');
                return;
            }
            
            if (isNaN(servicePrice) || parseFloat(servicePrice) <= 0) {
                alert('Price must be a valid number greater than 0!');
                return;
            }
            
            const defaultImage = "images/default-service.jpg";
            
            const newService = {
                name: serviceName,
                description: serviceDescription,
                price: servicePrice + ' SAR',
                imageUrl: defaultImage,
                timestamp: new Date().toISOString()
            };
            
            const services = JSON.parse(localStorage.getItem('providerServices')) || [];
            services.push(newService);
            localStorage.setItem('providerServices', JSON.stringify(services));
            
            alert('Service "' + serviceName + '" has been added successfully!');
            window.location.href = 'provieder-dashbord.html';
        });
    }
});










































//ser Request
document.querySelector(".S-button").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission to check the inputs

    // Get the form elements
    let serviceSelect = document.getElementById("service");
    let service = serviceSelect.value; // Selected service value (service1, service2, etc.)
    let serviceName = serviceSelect.options[serviceSelect.selectedIndex].text; // Actual service name
    let name = document.getElementById("customer-name").value;
    let dueDate = document.getElementById("datetime").value;
    let description = document.getElementById("description").value;

    // Validation rules
    if (service === "") {
        alert("Please select a service.");
        return; // Stop the form submission
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) { // Check if the name only contains letters and spaces
        alert("Please enter a valid full name (no numbers or special characters).");
        return;
    }

    // Convert the due date to a Date object for comparison
    let currentDate = new Date();
    let dueDateObject = new Date(dueDate);

    // Define the specific restricted dates (December 1st and 2nd, 2025)
    let restrictedStartDate = new Date("2025-12-01");
    let restrictedEndDate = new Date("2025-12-02");

    // If the date is before December 1st, 2025
    if (dueDateObject < restrictedStartDate) {
        alert("Booking is not possible for dates before December 1st, 2025.");
        return;
    }

    // If the date is December 1st or 2nd, 2025
    if (dueDateObject >= restrictedStartDate && dueDateObject <= restrictedEndDate) {
        alert("The selected date is too soon (December 1st or 2nd, 2025). Please select a later date.");
        return;
    }

    // If the date is after December 2nd, 2025, it's valid
    if (dueDateObject > restrictedEndDate) {
        // Proceed with further validation for description length
        if (description.length < 100) {
            alert("Description must be at least 100 characters long.");
            return;
        }

        // If all checks pass, proceed with confirmation
        let confirmation = confirm("Your request was sent successfully. Do you want to stay on this page or return to the dashboard?");
        if (confirmation) {
            displayRequest(serviceName, name, dueDate, description);  // Display request info with the actual service name
        } else {
            window.location.href = "Customer.html"; // Redirect to the customer dashboard
        }
    }
});

// Function to display request information on the page
function displayRequest(serviceName, name, dueDate, description) {
    let requestInfo = document.createElement("div");
    requestInfo.classList.add("request-info");

    // Display the actual service name instead of service1, service2, etc.
    requestInfo.innerHTML = `
        <h3>Request Details:</h3>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
        <p><strong>Description:</strong> ${description}</p>
    `;

    document.querySelector(".S-container").appendChild(requestInfo);
}