//For Styling Reference : https://codepen.io/CreativeJuiz/pen/cvyEi

var pazzword = (function () {


    return {
        init: function () {
            this.initTogglePassword();
            this.initChangePassword();
            this.evaluate();
        },
        initTogglePassword: function () {
            $("#unmask").click(function () {
                var $password = $("#password");
                var inputType = $password.prop("type");
                $password.prop("type", inputType == "text" ? "password" : "text")
                return false;
            });
        },
        initChangePassword: function () {
            var self = this;
            $("#password").on("keyup", function () {
                self.evaluate();
            });
        },
        evaluate: function (value) {
            var value = $("#password").val() || "";
            var power = 0;
            var errorMessage = "";
            $(".errormessage").text(errorMessage);
            if (value.length < 8) {
                power = 10;
                errorMessage = "Password should be minimum 8 characters in length.</br>";
            } else {
                if (/[A-Z]/.test(value)) {
                    power += 15;
                } else {
                    errorMessage+="Password should contain atleast one Uppercase Letter</br>";
                }
                if (/[a-z]/.test(value)) {
                    power += 15;
                } else {
                    errorMessage+= "Password should contain atleast one Lowercase Letter</br>";
                }
                if (/[0-9]/.test(value)) {
                    power += 15;
                } else {
                    errorMessage+= "Password should contain atleast one Number</br>";
                }
                if (/[^\w\*]/.test(value)) {
                    power += 15;
                } else {
                    errorMessage+="Password should contain atleast one Symbol</br>";
                }

                //To Check Consecutive cases
                if(!/[A-Z]{2}/.test(value)){
                    power += 5;
                }
                if(!/[a-z]{2}/.test(value)){
                    power += 5;
                }
                if(!/[0-9]{2}/.test(value)){
                    power += 5;
                }

                //To Check Repetency
                if(!this.hasRepeatedLetters(value)){
                    power += 10;
                }

                //To Check Sequecne
                if(!this.hasSequence(value,"0123456789")){
                    power += 5;
                }

                if(!this.hasSequence(value.toLowerCase(),"abcdefghijklmnopqrstuvwxyz")){
                    power += 5;
                }

                if(!this.hasSequence(value,"~!@#$%^&*()_+")){
                    power += 5;
                }

            }

            if(power<45){
                $("#strengthbar").addClass("error");
                $(".errormessage").html(errorMessage).show();
            } else {
                $(".errormessage").hide();
                $("#strengthbar").removeClass("error");
            }
            console.error(value, power, this.hasRepeatedLetters(value));
            $("#strengthbar").width(power + "%").prop("title", power + "%");
        },
        hasRepeatedLetters: function (str) {
            var tmp = {};
            str = str.toLowerCase();
            for (var i = str.length - 1; i >= 0; i--) {
                var c = str.charAt(i);
                if (c in tmp) {
                    tmp[c] += 1;
                }
                else {
                    tmp[c] = 1;
                }
            }
            var result = {};
            for (c in tmp) {
                if (tmp.hasOwnProperty(c)) {
                    if (tmp[c] > 1) {
                        result[c] = tmp[c];
                    }
                }
            }
            return Object.keys(result).length>0;
        },
        hasSequence : function (str,dic) {
            //var dic = "0123456789";
            for(var i =0; i<str.length-2;i++){
                var seq = str.substr(i,3);
                if(dic.indexOf(seq)>-1){
                    return true;
                }
            }
            return false;
        }
    }

})();


$(document).ready(function () {
    pazzword.init();
    //test for
    //L@n!&3AbS = 100%
    //Lalit@1234 = 75%
});