$(document).ready(function() {
    let students = []; // Global array to store student data

    function createStudent(name, age, image, features) {
        return {
            id: Date.now(), // Unique ID based on timestamp
            name: name,
            age: age,
            image: image,
            features: features,
        };
    }

    function displayStudent(student) {
        $("#studentList").append(`
            <div class="student-card" id="student-${student.id}">
                <img src="${student.image}">
                <div class="info">
                    <h3>${student.name}</h3>
                    <p>Age: ${student.age}</p>
                    <p>Features: ${student.features}</p>
                </div>
                <div class="buttons">
                    <button class="remove-btn" data-id="${student.id}">Remove</button>
                    <button class="modify-btn" data-id="${student.id}">Modify</button>
                </div>
            </div>
        `);
        $('#listTitle').show();
        $("#hideShowList").show();
    }

    function uploadImage(file, callback) {
        let reader = new FileReader(); 
        reader.onload = function (event) {
            callback(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    $("#studentForm").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        var name = $("#name").val();
        var age = $("#age").val();
        var features = $("#features").val();
        var fileInput = $("#image")[0];
        var file = fileInput.files[0];

        if (file) {
            uploadImage(file, function (image) {
                var student = createStudent(name, age, image, features);
                students.push(student); // Add new student to the global array
                displayStudent(student); // Display the new student card
                $("#studentForm")[0].reset(); // Clear the form fields
            });
        } else {
            alert("Please upload an image");
        }
    });

    $("#studentList").on("click", ".remove-btn", function () {
        var id = $(this).data("id");
        $(`#student-${id}`).remove(); // Remove the student card from the DOM
    });

    function sortByAge() {
        students.sort((a, b) => b.age - a.age); // Sort students by age
        $('#studentList').empty(); // Clear the current list
        for (let i = 0; i < students.length; i++) {
            displayStudent(students[i]); // Re-display sorted students
        }
    }

    $('#sortByAge').click(function() {
        sortByAge();
    });

    // Toggle button click event
    $('#hideShowList').on('click', function() {
        if ($('#studentList').is(':visible')) {
            $('#studentList').hide();
            $("#hideShowList").text('Show List');
        } else {
            $('#studentList').show();
            $(this).text('Hide List');
        }
    });
});
