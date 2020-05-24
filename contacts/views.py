from rest_framework.views import APIView
from .models import Contact
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import permissions

# Create your views here.
class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            send_mail(
                data['subject'],
                'Name: '
                + data['name']
                + '\nEmail: '
                + data['email']
                + '\n\nMessage: \n'
                + data['message'],
                'ojosunday1410@gmail.com', 
                ['ojosunday1410@gmail.com'],
                fail_silently=False
            )
            contact = Contact(email=data['email'], name=data['name'],
            subject=data['subject'], message=data['message'])
            contact.save()

            return Response({'success': 'Message Sent Successfully'})
        except:
            return Response({'error':'Message failed to send'})

