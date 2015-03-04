var REQUIREDFIELD = "Campo requerido";
var NOTVALIDMAIL = "No es un correo electrónico válido";
var PWDNOTMATCH = "Las contraseñas no coinciden";
var NOTSENT = "No se pudo enviar la información. Valide e intente nuevamente";

$(function () {
    $("#login-form").validate({
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: true,
        rules: {
            email: {
                required: true
            },
            pwd: {
                required: true
            }
        },
        messages: {
            email: {
                required: REQUIREDFIELD
            },
            pwd: {
                required: REQUIREDFIELD
            }
        }
    });

    $("#loginBtn").click(function () {
        if (!$("#login-form").valid()) {
            $.pnotify({
                title: 'Error al enviar',
                text: NOTSENT
            });
            return false;
        }

        $("#loginBtn").prop("disabled", true);
        $.post("/Admin/Login/", {
            email: $("#emailBox").val(),
            password: $("#pwdBox").val(),
            remember: $("#rememberBox").is(":checked")
        }, function (result) {
            if (result.success) {
                $.pnotify({
                    title: '¡Bienvenido!',
                    text: 'Ha iniciado sesión de forma exitosa',
                    type: 'success'
                });
                window.location = $("#returnUrl").val();
            }
            else {
                $.pnotify({
                    title: 'Error de autenticación',
                    text: result.message,
                    type: 'error'
                });
                $("#loginBtn").prop("disabled", false);
            }
        }).fail(function () {
            $.pnotify({
                title: 'Error al enviar',
                text: NOTSENT,
                type: 'error'
            });
            $("#loginBtn").prop("disabled", false);
        });

        return false;
    });

    //
    $("#register-form").validate({
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: true,
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            pwd: {
                required: true
            },
            rePwd: {
                required: true,
                equalTo: "#reg-pwdBox"
            }
        },
        messages: {
            firstname: {
                required: REQUIREDFIELD
            },
            lastname: {
                required: REQUIREDFIELD
            }, email: {
                required: REQUIREDFIELD,
                email: NOTVALIDMAIL
            },
            pwd: {
                required: REQUIREDFIELD
            },
            rePwd: {
                required: REQUIREDFIELD,
                equalTo: PWDNOTMATCH
            }
        }
    });

    $("#registerBtn").click(function () {
        if (!$("#register-form").valid()) {
            $.pnotify({
                title: 'Error al enviar',
                text: NOTSENT
            });
            return false;
        }

        $("#registerBtn").prop("disabled", true);
        $.post("/Admin/Register/", {
            firtstName: $("#reg-firstnameBox").val(),
            lastName: $("#reg-lastnameBox").val(),
            email: $("#reg-emailBox").val(),
            password: $("#reg-pwdBox").val()
        }, function (result) {
            if (result.success) {
                $.pnotify({
                    title: '¡Bienvenido!',
                    text: 'Te has registrado de forma exitosa',
                    type: 'success'
                });
                window.location = $("#returnUrl").val();
            }
            else {
                $.pnotify({
                    title: 'Error en el registro',
                    text: result.message,
                    type: 'error'
                });
                $("#registerBtn").prop("disabled", false);
            }
        }).fail(function () {
            $.pnotify({
                title: 'Error al enviar',
                text: NOTSENT,
                type: 'error'
            });
            $("#registerBtn").prop("disabled", false);
        });

        return false;
    });

    //
    $(".start-disabled").prop("disabled", false);
});

function show_box(id) {
    $('.widget-box.visible').removeClass('visible');
    $('#' + id).addClass('visible');
}