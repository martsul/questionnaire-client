export const dictionary = {
    en: {
        form: {
            title: "Name of the form",
            description: "Description",
            education: "Education",
            quiz: "Quiz",
            other: "Other",
            theme: "Choose a theme",
            tag: "Select Tags",
            user: "Select users",
            save: "Save",
        },
        header: {
            login: "Log In",
            logout: "Log Out",
            profile: "Profile",
            search: "Search",
            adminPanel: "Admin panel",
            noResult: "No Result",
        },
        authorization: {
            login: "Log In",
            signUp: "Sign Up",
            email: "Email address",
            enterEmail: "Enter email",
            name: "Name",
            enterName: "Enter name",
            password: "Password",
            enterPassword: "Enter password",
            noAccount: "No Account",
            submit: "Submit",
        },
        errors: {
            unknown: "Unknown error. Please repeat later.",
            "Invalid email address":
                "There is no user with this email address.",
            "Invalid password": "Wrong password.",
            "Validation error: Validation len on name failed":
                "The name must be between 1 and 100 characters long.",
            "Validation error: Validation len on email failed":
                "Fill in the email field.",
            "Validation error: Validation isEmail on email failed":
                "Incorrect email address.",
            "Validation error: Validation len on password failed":
                "The password must have at least 1 character.",
            "Validation error": "The user with this email already exists.",
            Unauthorized: "Authorization error",
            "User is blocked": "This user is blocked",
        },
        success: {
            success: "The operation was successful",
        },
        usersTable: {
            title: "Users",
            id: "ID",
            name: "Name",
            status: "Status",
            role: "Role",
        },
    },
    es: {
        form: {
            title: "Nombre del formulario",
            description: "Descripción",
            education: "Educación",
            quiz: "Cuestionario",
            other: "Otro",
            theme: "Elige un tema",
            tag: "Seleccionar etiquetas",
            user: "Seleccionar usuarios",
            save: "Guardar",
        },
        header: {
            login: "Iniciar sesión",
            logout: "Cerrar sesión",
            profile: "Perfil",
            search: "Buscar",
            noResult: "Sin resultados",
            adminPanel: "Panel de administración",
        },
        authorization: {
            login: "Iniciar sesión",
            signUp: "Registrarse",
            email: "Dirección de correo electrónico",
            enterEmail: "Ingresa tu correo electrónico",
            name: "Nombre",
            enterName: "Ingresa tu nombre",
            password: "Contraseña",
            enterPassword: "Ingresa la contraseña",
            noAccount: "Sin cuenta",
            submit: "Enviar",
        },
        errors: {
            unknown:
                "Error desconocido. Por favor, intenta de nuevo más tarde.",
            "Invalid email address":
                "No existe un usuario con esta dirección de correo electrónico.",
            "Invalid password": "Contraseña incorrecta.",
            "Validation error: Validation len on name failed":
                "El nombre debe tener entre 1 y 100 caracteres de longitud.",
            "Validation error: Validation len on email failed":
                "Rellena el campo de correo electrónico.",
            "Validation error: Validation isEmail on email failed":
                "Dirección de correo electrónico incorrecta.",
            "Validation error: Validation len on password failed":
                "La contraseña debe tener al menos 1 carácter.",
            "Validation error":
                "Ya existe un usuario con este correo electrónico.",
            Unauthorized: "Error de autorización",
            "User is blocked": "Este usuario está bloqueado",
        },
        success: {
            success: "La operación fue exitosa",
        },
        usersTable: {
            title: "Usuarios",
            id: "ID",
            name: "Nombre",
            status: "Estado",
            role: "Rol",
        },
    },
} as const;
