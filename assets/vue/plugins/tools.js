
export function notification(h,title,message) {
    this.$notify({
        title: title,
        message: h('i', { style: 'color: teal' }, message),
        duration: 1000
    });
}

export function createUUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function getRoutesBack() {
    const menus = [
        {header: 'MAIN NAVIGATION'},
        {href:'/back/variable',icon: 'assignment', label: 'Variable', test: false},
        {
            icon: 'extension',
            label: 'Button',
            toogle: 'menu-toggle',
            children: [
                {
                    href:'/back/button/basic-usage',
                    icon: 'photo_filter',
                    label: 'Basic Usage',
                    test: false
                }
            ]
        },
    ]

    return menus
}
export function getImages() {
    const images = {
        'login': getRootPath()+'/img/jocelyn.jpg'
    }

    return images
}
export function getRootPath() {
    // /sales5/public
    return ''
}

export function checkAccesUrl(codeModule,user,codeRights) {
    let result = false

    if(codeModule != undefined){
        if(user.selectedProfiles != undefined){
            for (let i = 0; i < user.selectedProfiles.length; i++){
                let selectedProfile = user.selectedProfiles[i]
                // recherche par code profile
                const profile = user.profiles.find(item => item.label == selectedProfile)
                if(profile){
                    const profileModuleRights = profile.profileModuleRight.find(module => module.code == codeModule)
                    if(!profileModuleRights){
                        // not permission url
                        result = false
                    }else {
                        if(profileModuleRights.selectedRights.length == 0){
                            // not permission url
                            result = false
                        }else {
                            profileModuleRights.selectedRights.forEach(item => {
                                codeRights.forEach(codeRight => {
                                    if(item.code == codeRight){
                                        result = true
                                    }
                                })
                            })
                        }
                    }
                }
            }
        }

    }

    return result

}

export function checkNoAccess(codeModule,user,codeRights){
    let result = false

    if(codeModule != undefined){
        for (let i = 0; i < user.selectedProfiles.length; i++){
             let selectedProfile = user.selectedProfiles[i]
            // recherche par code profile
            const profile = user.profiles.find(item => item.label == selectedProfile)
            if(profile){
                const profileModuleRights = profile.profileModuleRight.find(module => module.code == codeModule)
                if(!profileModuleRights){
                    // show and permission url
                    result = true
                }else {
                    if(profileModuleRights.selectedRights.length == 0){
                        // not show
                        result = false
                    }else {
                        profileModuleRights.selectedRights.forEach(item => {
                            codeRights.forEach(codeRight => {
                                if(item.code == codeRight){
                                    result = true
                                }
                            })
                        })
                    }
                }
            }
        }
    }

    return result
}

export function profileToLabel(codeProfile,profiles) {
    const res = profiles.find(profile => profile.code == codeProfile)

    return res.label
}

export function getCodeNoAcces() {
    // visible all
    return ['25f8ab3f-7dc9-4653-a0f3-ca69e91f809e','7fdcea4a-bcc4-4797-a21e-f59ba2305d88']
}

export function getCodeModule() {
    return 'd5d3ca9c-80d1-4bec-8931-00783a579f29'
}

export function getNbPage(length,max) {
    const number = Math.floor(length / max)
    const modulo = length % max
    if(modulo != 0){
        return number + 1
    }else {
        return number
    }
}

 function initFB() {
    return new Promise(resolve => {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1551917591648102',
                xfbml      : true,
                cookie     : true,
                version    : 'v8.0'
            });
            FB.AppEvents.logPageView();
            resolve()
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })
}

export function getFB(){
    return new Promise(async resolve => {
        await initFB()
        resolve(window.FB)
        // if (window.FB) {
        //     resolve(window.FB)
        // } else {
        //     console.log('ici 2')
        //
        //     resolve(window.FB)
        // }
    })
}

export function moneyFormat(amount) {
    const decimalCount = 2;
    // decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const decimal = "."
    const thousands = " "
    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
}

export function generatePwd(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export function countries() {

    return ['Afghanistan','Afrique_Centrale','Afrique_du_Sud','Albanie','Algerie','Allemagne','Andorre','Angola','Anguilla',
    'Arabie_Saoudite','Argentine','Armenie','Australie','Autriche','Azerbaidjan','Bahamas','Bangladesh','Barbade','Bahrein',
        'Belgique','Belize','Benin','Bermudes','Bielorussie','Bolivie','Botswana','Bhoutan','Boznie_Herzegovine','Bresil',
    'Brunei','Bulgarie','Burkina_Faso', 'Burundi', 'Caiman', 'Cambodge', 'Cameroun', 'Canada', 'Canaries', 'Cap_vert',
        'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Congo_democratique', 'Cook', 'Coree_du_Nord', 'Coree_du_Sud',
        'Costa_Rica', 'Cote_d_Ivoire', 'Croatie', 'Cuba', 'Danemark', 'Djibouti', 'Dominique', 'Egypte', 'Emirats_Arabes_Unis', 'Equateur',
        'Erythree', 'Espagne', 'Estonie', 'Etats', 'Ethiopie', 'Falkland', 'Feroe', 'Fidji', 'Finlande', 'France',
        'Gabon', 'Gambie', 'Georgie', 'Ghana', 'Gibraltar', 'Grece', 'Grenade', 'Groenland', 'Guadeloupe', 'Guam',
        'Guatemala', 'Guernesey', 'Guinee', 'Guinee_Bissau', 'Guinee equatoriale', 'Guyana', 'Guyane_Francaise', 'Haiti', 'Hawaii', 'Honduras',
        'Hong_Kong', 'Hongrie', 'Inde', 'Indonesie', 'Iran', 'Iraq', 'Irlande', 'Islande', 'Israel', 'Italie',
        'Jamaique', 'Jan Mayen', 'Japon', 'Jersey', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizstan', 'Kiribati', 'Koweit',
        'Laos', 'Lesotho', 'Lettonie', 'Liban', 'Liberia', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Lybie', 'Macao',
        'Macedoine', 'Madagascar', 'Madère', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Man', 'Mariannes du Nord',
        'Maroc', 'Marshall', 'Martinique', 'Maurice', 'Mauritanie', 'Mayotte', 'Mexique', 'Micronesie', 'Midway', 'Moldavie',
        'Monaco', 'Mongolie', 'Montserrat', 'Mozambique', 'Namibie', 'Nauru', 'Nepal', 'Nicaragua', 'Niger', 'Nigeria',
        'Niue', 'Norfolk', 'Norvege', 'Nouvelle Calédonie', 'Nouvelle_Zelande', 'Oman', 'Ouganda', 'Ouzbekistan', 'Pakistan', 'Palau',
        'Palestine', 'Panama', 'Papouasie_Nouvelle_Guinee', 'Paraguay', 'Pays-Bas', 'Perou', 'Philippines', 'Pologne', 'Polynesie', 'Porto_Rico',
        'Portugal', 'Qatar', 'Republique_Dominicaine', 'République tchèque', 'Reunion', 'Roumanie', 'Royaume-Uni', 'Russie', 'Rwanda', 'Sahara Occidental',
        'Saint Barthélemy', 'Sainte_Lucie', 'Saint_Marin', 'Saint Martin', 'Saint Pierre et Miquelon', 'Salomon', 'Salvador', 'Samoa_Occidentales', 'Samoa_Americaine', 'Sao_Tome_et_Principe', 'Senegal',
        'Seychelles', 'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovenie', 'Somalie', 'Soudan', 'Sri_Lanka', 'Suede', 'Suisse',
        'Surinam', 'Swaziland', 'Syrie', 'Tadjikistan', 'Taiwan', 'Tonga', 'Tanzanie', 'Tchad', 'Thailande', 'Tibet',
        'Timor_Oriental', 'Togo', 'Trinite_et_Tobago', 'Tristan da cunha', 'Tunisie', 'Turkmenistan', 'Turquie', 'Ukraine', 'Uruguay', 'Vanuatu',
        'Vatican', 'Venezuela', 'Vierges_Americaines', 'Vierges_Britanniques', 'Vietnam', 'Wake', 'Wallis et Futuma', 'Yemen', 'Yougoslavie', 'Zambie', 'Zimbabwe' ]
}
