$(document).ready(function () {
    

    listing();
    $('#selectbox').change(function () {
        let target = $(this).val()
        show_select_review(target)
    })

});

function listing() {
    let sel_text = $("#selectbox option:selected").val();
    show_select_review(sel_text)
}

function posting() {
    let sel_text = $("#selectbox option:selected").text();
    let comment = $('#comment').val()
    $.ajax({
        type: 'POST',
        url: '/emoji/posting',
        data: { name_give: sel_text, comment_give: comment },
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}

function delete_review(num) {
    $.ajax({
        type: "POST",
        url: "/emoji/delete",
        data: { num_give: num },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}

function modify_review(num) {
    let text = num.toString()

    $("#txtfield" + text).attr("disabled", false)
    $("#btn-confirm" + text).show()
    $("#modifybtn" + text).hide()
    $("#deletebtn" + text).hide()
}

function modify_confirm(num) {
    let text = num.toString()
    let comment = $("#txtfield" + text).val()

    $.ajax({
        type: "POST",
        url: "/emoji/modify",
        data: { num_give: num, comment_give: comment },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}


function show_select_review(val) {
    if (val == 'all') {
        $.ajax({
            type: 'GET',
            url: '/review/posting',
            data: {},
            success: function (response) {
                let rows = response['reviews']
                for (let i = 0; i < rows.length; i++) {
                    let name = rows[i]['name']
                    let comment = rows[i]['comment']
                    let num = rows[i]['num']

                    let temp_html = `<div class="card">
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <h5 class="card-title">${name}</h5>
                                            <textarea class="autosize" id="txtfield${num}" disabled>${comment}</textarea>
                                            <div class="btnarea">
                                                <p><button type="button" id="btn-confirm${num}" class="btn btn-primary btnmodify" onclick="modify_confirm(${num})">confirm</button></p>
                                                <span><button type="button" onclick="modify_review(${num})" class="btn btn-outline-primary" id="modifybtn${num}">modify</button></span>
                                                <span><button type="button" onclick="delete_review(${num})" class="btn btn-outline-secondary" id="deletebtn${num}">delete</button></span>
                                            </div>     
                                        </blockquote>                                    
                                    </div>   
                                </div>`
                    $('#cards-box').append(temp_html)
                }
                $('.btnmodify').hide()
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/review/postingByTitle",
            data: { title_give: val },
            success: function (response) {
                $('#cards-box').empty()
                let rows = response['reviews']
                for (let i = 0; i < rows.length; i++) {
                    let name = rows[i]['name']
                    let comment = rows[i]['comment']
                    let num = rows[i]['num']
                    let temp_html = `<div class="card">
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <h5 class="card-title">${name}</h5>
                                            <textarea class="autosize" id="txtfield${num}" disabled>${comment}</textarea>
                                            <div class="btnarea">
                                                <p><button type="button" id="btn-confirm${num}" class="btn btn-primary btnmodify" onclick="modify_confirm(${num})">confirm</button></p>
                                                <span><button type="button" onclick="modify_review(${num})" class="btn btn-outline-primary" id="modifybtn${num}">modify</button></span>
                                                <span><button type="button" onclick="delete_review(${num})" class="btn btn-outline-secondary" id="deletebtn${num}">delete</button></span>
                                            </div>     
                                        </blockquote>                                    
                                    </div>   
                                </div>`
                    $('#cards-box').append(temp_html)
                }
                $('.btnmodify').hide()

            }
        });
    }
}