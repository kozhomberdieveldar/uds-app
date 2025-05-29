from rest_framework import generics, permissions
from .models import Client, BonusTransaction
from .serializers import ClientSerializer, BonusTransactionSerializer

class ClientListAPIView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientBonusView(generics.RetrieveAPIView):
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Client.objects.get(user=self.request.user)

class BonusTransactionListView(generics.ListAPIView):
    serializer_class = BonusTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        client = Client.objects.get(user=self.request.user)
        return BonusTransaction.objects.filter(client=client).order_by('-created_at')

