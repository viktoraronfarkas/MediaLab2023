import React from 'react';
import { Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { theme, styles } from '../constants/myTheme';


const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.backgroundSand,
  },

  title: {
    color: theme.colors.primary,
    fontSize: 32,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 250,
    paddingBottom: 20,
  },

  header: {
    paddingVertical: 20,
  },
  body: {
    paddingBottom: 20,
  },
});
/**
 * This is the Data Security Page.
 * It contains only information about general data security.
 *
 */
export default function DataSecurity() {
  return (
    <SafeAreaView style={[style.container]}>
      <ScrollView style={{margin: 20}}>
        <Text style={[styles.headline1, style.title]}>
          App Data Privacy Policy
        </Text>

        <Text
          style={[
            styles.bodyDefault,
            { textAlign: 'center', paddingBottom: 20 },
          ]}
        >
          In order to work appropriately, the app UASync collects data from your
          phone. Once you install our app, you agree that we may collect the
          following data:
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Accounting Information
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          To use the app, you must register with a name and/or username, e-mail
          address, study programme and password. It is also optional to upload a
          profile image. This information is transferred securely. The password
          is additionally transferred and encrypted to our database.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Personal Information
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          During registration, you must enter a bibliography text.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Information About Your Device
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          This includes the operating system and version, device identification
          number, mobile provider, language, battery power, Bluetooth, WLAN or
          other existing network connections, and other data needed for
          downloading from App Stores.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Communication With Us
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          If you contact us, we will collect and process information on this
          matter. This may include all the information you provide, including
          name, email address, and other contact information. You can, of
          course, also give anonymous feedback with an e-mail account that does
          not reveal your identity.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          How Do We Use the Information?
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          We use the information we gather in different ways. In order for the
          app to work, this information is first sent via a secure connection to
          our servers and stored there. The data are then analyzed and returned
          to your phone. These analysis results are also stored on our servers.
          We also use the collected data to further improve our app. In
          addition, the data are processed as part of students’ projects in the
          academic course “Media Lab” of the Department of Media and Digital
          Technologies of the University of Applied Sciences St. Pölten to
          evaluate the usability of the app. Dissemination reports and
          documentation derived from the project do not disclose personal
          information in order to assure that third parties cannot lead to an
          identification of the person. The University of Applied Sciences St.
          Pölten also ensures that the data does not reach unauthorized third
          parties and is stored on secure, encrypted servers or in restricted
          areas. If data processing and storing in external cloud systems (e.g.,
          Dropbox, Dropbox for Business, Tresorit, etc.) is unavoidable, the
          research faculty members ensure that this data is protected by
          separate encryption from unauthorized access by third parties.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Extension Of Data To Third Parties
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          To run the app, we need to pass on information that we collect through
          the app to third parties inside and outside the European Economic
          Area. This can happen in the following cases: {'\n'} – If necessary,
          we can share your data with governmental organizations in order to
          prevent damage to you, us, or others. {'\n'} – As described above, we
          plan to use your data in an anonymous form for academic purposes.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Safety Of Our Systems
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          We use systems from hosting partners to get the necessary hardware,
          software, networks, and storage space to run the app. These systems
          may be located outside the European economic area. If you install the
          app, you agree. We use commercially available physical and technical
          backups to protect your data. Unfortunately, we cannot guarantee 100%
          security of your data. The security of your data may be violated by
          unforeseen events such as unauthorized access, hardware or software
          problems, and other complications.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Data Security And Data Deletion
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          The national and international data protection regulations apply.
          After completion of the academic project and if an account is not in
          use, the data (“raw data”) are kept for 10 years to prove the
          correctness of the research results and then submitted for
          deletion/anonymization. If you delete your account, you may also
          request the deletion of your information.
        </Text>
        <Text style={[styles.headline2, style.header]}>
          Privacy Policy Changes
        </Text>
        <Text style={[styles.bodyDefault, style.body]}>
          We reserve the right to change this privacy policy at any time. We
          will provide you with timely information on our app and/or website
          before any such change takes place. If you do not agree to the amended
          declarations, you can delete your account at any time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
