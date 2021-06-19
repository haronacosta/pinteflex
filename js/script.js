// Variables
const header_search = document.querySelector('#header_search');

const header_select = document.querySelector('#headerSelect');

const search_input_container = document.querySelector(
  '#search-input-container'
);

const search_icon = document.querySelector('#iconSearch');

const search_box = document.querySelector('#search-box');

const search_input_value = document.querySelector('#search-input');

const search_input_icon = document.querySelector('#search-input-icon');

const base_url = `https://api.pexels.com/v1/`;

const api_key = `563492ad6f9170000100000167f09d03d9f345afa21356df73e3f9e4`;

const wrapper = document.querySelector('.wrapper');

// Se prepara el documento
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar y cerrar el search
  search_icon.addEventListener('click', searchBox);

  search_box.addEventListener('click', searchBox);

  // Eliminar contenido del input search
  search_input_icon.addEventListener('click', deleteSearchValue);

  // Validar si el input tiene contenido y agregar la x
  search_input_value.addEventListener('keyup', validarInput);

  // Mostrar home select
  header_select.addEventListener('click', mostrarOpciones);

  const imagenes = obtenerImagenes();

  imagenes.then((data) => {
    for (let i = 0; i < 6; i++) {
      let counter = 12 * i;

      const column = createColumn(counter, data);

      wrapper.appendChild(column);
    }
  });
});

// Funciones

const createColumn = (counter, data) => {
  const wrapper_column = document.createElement('div');

  wrapper_column.classList.add('wrapper__column');

  for (let i = 0; i < 12; i++) {
    const wrapper_image = document.createElement('div');

    wrapper_image.classList.add('wrapper__image');

    const image = createImage(data[counter]);

    const title = createTitle(data[counter]);

    wrapper_image.appendChild(image);

    wrapper_image.appendChild(title);

    wrapper_column.appendChild(wrapper_image);

    counter++;
  }

  return wrapper_column;
};

const createImage = ({ url, photographer }) => {
  const image = document.createElement('img');

  image.classList.add('image');

  image.src = url;

  image.alt = photographer;

  return image;
};

const createTitle = ({ photographer }) => {
  const title = document.createElement('div');

  title.classList.add('image__title');

  title.textContent = `By: ${photographer}`;

  return title;
};

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
};

const deleteSearchValue = () => {
  search_input_value.value = '';

  search_input_icon.classList.add('d-none');
};

const validarInput = (e) => {
  if (e.target.value.length > 0) {
    search_input_icon.classList.remove('d-none');
  }
};

const mostrarOpciones = () => {
  const elemento = header_select.childNodes[3];

  if (elemento.classList.contains('v-hidden')) {
    elemento.classList.remove('v-hidden');
  } else {
    elemento.classList.add('v-hidden');
  }
};

const obtenerImagenes = async () => {
  const solicitud = await fetch(`${base_url}curated?per_page=72`, {
    headers: {
      Authorization: api_key,
    },
  });

  const { photos } = await solicitud.json();

  const photos_data = await photos.map((photo) => ({
    id: photo.id,
    photographer: photo.photographer,
    url: photo.src.large,
  }));

  return photos_data;
};
