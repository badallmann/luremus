// Idé: Definere et hierarki av meny-sider som automatisk lar seg beveges i.

// Hierarki definert av props, sider definert i endimensjonalt obj
const menuHierarchy = {
  signedOut: {  // "signedOut" er en string key
    signIn: {
      errorSigningIn: {}
    },
    createUser: {
      errorCreatingUser: {}
    }
  },
  signedIn: {
    settings: {
      deleteUser: {
        confirmDeleteUser: {}
      }
    }
  }
}

/*
	Separasjonsprinsipp: Sidene og hierarkiet er definert separat, noe som gjør det enkelt å utvide eller endre strukturen.
	•	Fleksibel navigering: Navigasjonen styres av hierarkiet, så du trenger ikke hardkode navigasjonen i selve sidene. Hvis du endrer hierarkiet, kan du automatisk endre navigasjonen uten å røre sideinnholdet.
	•	Enkel å vedlikeholde: Hvis du trenger å legge til nye sider eller endre hierarkiet, kan du gjøre det på ett sted uten å påvirke logikken i hele systemet.

  Dette systemet gir deg stor fleksibilitet, og hierarkiet kan tilpasses etter hvert som applikasjonen vokser.
*/