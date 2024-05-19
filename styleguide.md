# Style Guide

## Colors

### Custom Overrides

- **Primary Color**:

```
$primary: #d9981e !default;
```

- **Secondary Color**:

```
$secondary: #a68a56 !default;
```

- **Dark Color**:

```
$dark: #0d0d0d !default;
```

- **Body Background (Dark)**:

```
$body-bg-dark: #403e3f !default;
```

- **Body Secondary Background (Dark)**:

```
$body-secondary-bg-dark: #737373 !default;
```

- **Headings Color (Dark)**:

```
$headings-color-dark: #fff !default;
```

- **Navbar Icon Color (Dark)**:

```
$navbar-dark-icon-color: #d9981e !default;
```

- **Body Text Color (Dark)**:

```
$body-color-dark: #fff !default;
```

## Bootstrap Default Colors

- **Primary Color**:
  ´´´
  --bs-primary: #007bff;
  ´´´

- **Secondary Color**:

```
--bs-secondary: #6c757d;
```

- **Success Color**:

```
--bs-success: #28a745;
```

- **Danger Color**:

```
--bs-danger: #dc3545;
```

- **Warning Color**:

```
--bs-warning: #ffc107;
```

- **Info Color**:

```
--bs-info: #17a2b8;
```

- **Light Color**:

```
--bs-light: #f8f9fa;
```

- **Dark Color**:

```
--bs-dark: #343a40;
```

## Typography

- **Font Family**:

```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

- **Font Size**:

```
font-size: 1rem;
```

- **Font Weight**:

```
font-weight: 400;
```

## Layout

- **Container**:

```
.container {
width: 100%;
padding-right: var(--bs-gutter-x, 0.75rem);
padding-left: var(--bs-gutter-x, 0.75rem);
margin-right: auto;
margin-left: auto;
}
```

- **Row**:

```
.row {
display: flex;
flex-wrap: wrap;
margin-right: calc(var(--bs-gutter-x) / -2);
margin-left: calc(var(--bs-gutter-x) / -2);
}
```

- **Column**:

```
.col {
position: relative;
width: 100%;
padding-right: calc(var(--bs-gutter-x) / 2);
padding-left: calc(var(--bs-gutter-x) / 2);
}
```

## Buttons

- **Primary Button**:

```
.btn-primary {
color: #fff;
background-color: var(--bs-primary);
border-color: var(--bs-primary);
}
```

- **Secondary Button**:

```
.btn-secondary {
color: #fff;
background-color: var(--bs-secondary);
border-color: var(--bs-secondary);
}
```

## Forms

- **Input Fields**:

```
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
```

## Custom Components

- **Loading Screen**:

```
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(13, 13, 13, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: #fff;
}
```

- **Profile Avatar**:

```
.default-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 1.25rem;
  margin-left: 1rem;
}

.profile-container img {
  width: 200px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.camera-icon-wrapper {
  position: absolute;
  border-radius: 50%;
  background-color: #a68a56;
  color: black;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.camera-icon-wrapper i {
  font-size: 16px;
}
```

## Media Queries

- **Example**:

```
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
```
