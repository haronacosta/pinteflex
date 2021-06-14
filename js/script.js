// Variables
const header_search = document.querySelector('#header_search');

const header_select = document.querySelector('#headerSelect');

const search_input_container = document.querySelector('#search-input-container');

const search_icon = document.querySelector('#iconSearch');

const search_box = document.querySelector('#search-box');

const search_input_value = document.querySelector('#search-input');

const search_input_icon = document.querySelector('#search-input-icon');

// Se prepara el documento 
document.addEventListener('DOMContentLoaded', () => {

    // Mostrar y cerrar el search 
    search_icon.addEventListener('click', searchBox);

    search_box.addEventListener('click', searchBox);

    // Eliminar contenido del input search 
    search_input_icon.addEventListener('click', deleteSearchValue);

    // Validar si el input tiene contenido y agregar la x
    search_input_value.addEventListener('keyup', validarInput);
});


// Funciones
const searchBox = (e) => {

    e.stopPropagation();

    if (header_search.classList.contains('active')) {

        header_search.classList.remove('active');

        header_select.classList.remove('d-none');

        search_icon.classList.remove('d-none');

        search_input_container.classList.add('d-none');

    } else {
        header_search.classList.add('active');

        header_select.classList.add('d-none');

        search_icon.classList.add('d-none');

        search_input_container.classList.remove('d-none');
    }
}


const deleteSearchValue = () => {
    search_input_value.value = '';
    
    search_input_icon.classList.add('d-none');
}

const validarInput = (e) => {
    if (e.target.value.length > 0) {
        search_input_icon.classList.remove('d-none');
    }
}